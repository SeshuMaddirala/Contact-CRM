<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use TokenCache;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;
use Google;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Http;

include_once('TokenCache.php');

class Login extends BaseController
{
    public function index(){
        if(!empty(session()->get('login_through'))){
            if(session()->get('login_through') == 'google'){
                return redirect()->route('login_google_sso_action');
            }else{
                return redirect()->route('login_sso_action');
            }
        }else{
            return view('pages.login');
        }        
    }
     
    /**
     * Outlook SSO Login
     */
    public function login_sso_action(Request $request) {
        
        // Initialize the OAuth client 
        $oauthClient = $this->getOutlookClient();

        if(isset($_REQUEST['state'])){
            $request    = $_REQUEST;
            $authCode   = $request['code'];

            if (isset($authCode)) {
                try {
                    // Make the token request
                    $accessToken = $oauthClient->getAccessToken('authorization_code', [
                        'code' => $authCode
                    ]);
                    
                    $graph = new Graph();
                    $graph->setAccessToken($accessToken->getToken());

                    $user = $graph->createRequest('GET', '/me?$select=displayName,mail,mailboxSettings,userPrincipalName')
                        ->setReturnType(Model\User::class)
                        ->execute();
                        
                    $tokenCache = new TokenCache();
                    $tokenCache->storeTokens($accessToken, $user);
                 
                    session([
                        'loginUserName' => $user->getDisplayName(),
                        'loginUserMail' => $user->getMail(),
                        'login_through' => 'outlook'
                    ]);
                    return redirect(config("constants.LOGIN_REDIRECT_URL").'/attempt_login');
                }
                catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                    return redirect(config("constants.LOGIN_REDIRECT_URL"));
                }
            }
        }else{
            $authUrl = $oauthClient->getAuthorizationUrl();  
            return redirect($authUrl);
        }
    }

    public function getOutlookClient(){
        $oauthClient = new \League\OAuth2\Client\Provider\GenericProvider([
            'clientId'                => config("constants.MICROSOFT_GRAPH_CLIENT_ID"),
            'clientSecret'            => config("constants.MICROSOFT_GRAPH_CLIENT_SECRET"),
            'redirectUri'             => config("constants.MICROSOFT_GRAPH_REDIRECT_URI"),
            'urlAuthorize'            => config("constants.MICROSOFT_GRAPH_URL_AUTHORIZE"),
            'urlAccessToken'          => config("constants.MICROSOFT_GRAPH_URL_ACCESS_TOKENS"),
            'urlResourceOwnerDetails' => config("constants.MICROSOFT_GRAPH_URL_RESOURCEOWNERDETAILS"),
            'scopes'                  => config("constants.MICROSOFT_GRAPH_SCOPES")
        ]);

        return $oauthClient;
    }
    
    /**
     * Google SSO Login
     */

    public function login_google_sso_action(Request $request) {
        $client = $this->getGoogleClient();

        if (isset($_GET['code'])){
            try {
                // Make the token request
                $token_data = $client->fetchAccessTokenWithAuthCode($_GET['code']);

                $client->setAccessToken($token_data);
                
                $google_service = new \Google\Service\Oauth2($client);
                $user_info      = $google_service->userinfo->get();

                $user_timezone      = Http::get("https://www.googleapis.com/calendar/v3/users/me/settings/timezone?access_token=".$token_data['access_token']);
                
                $user_timezone_body = !empty($user_timezone->getBody())?json_decode($user_timezone->getBody(), true):'';
                
                $timezone_val       = '';
                if(!empty($user_timezone_body)){
                    $timezone_val = $user_timezone_body['value']; 
                }
                $token_data['timezone'] = $timezone_val;

                $tokenCache = new TokenCache();
                $tokenCache->storeTokens($token_data, $user_info,'google');
                
                session([
                    'loginUserName' => $user_info->name,
                    'loginUserMail' => $user_info->email,
                    'login_through' => 'google',
                    'token_data'    => $token_data
                ]);
                return redirect(config("constants.LOGIN_REDIRECT_URL").'/attempt_login');
            }catch (\Google_AuthException $e) {
                return redirect(config("constants.LOGIN_REDIRECT_URL"));
            }
        } else {
            $authUrl = $client->createAuthUrl();
            return redirect($authUrl);
        }
    }

    public function getGoogleClient(){
        $client = new Google\Client(config("constants.google"));
        if(!empty(session()->get('token_data'))){
            $client->setAccessToken(session()->get('token_data'));
        }
        return $client;
    }

    /**
     * when the user wants to login through SSO 
    */
    public function attempt_login(Request $request)
    {
        $username   = $request->session()->get('loginUserName');
        $useremail  = $request->session()->get('loginUserMail');
        
        /* Make a blind attempt at logging the user in. */
        $response = $this->processLogin($useremail);

        if(!$response){
            session()->flush();
            session()->save();
            echo "<div id='contents' style='text-align: center;font: normal normal normal 12px Arial, Tahoma, sans-serif;'>
                    <h4><b>Access Denied</b></h4>
                    <h4>You don't have permission to view this site.</h4>
                    <a href='/'>Click here to try again</a>
                </div>";
            exit;
        }
        return redirect()->route('index');
    }

     /**
     * Processes a user login request and sets up the session if successful.
     *
     * @param string User's username.
     * @param string User's password.
     * @param boolean Log this login attempt in Login History?
     * @return void
     */
    public function processLogin($useremail = '')
    {   
        if ($useremail == ''){
            return false;
        }

        $query_obj_data = DB::table('user')
            ->where('vEmail',$useremail)
            ->get(['*'])
            ->first();
        
        $query_response = json_decode(json_encode($query_obj_data), true);

        DB::table('login_history')->insert([
            'vEmail'            => $useremail,
            'vIpAddress'        => (isset($_SERVER['REMOTE_ADDR']))?$_SERVER['REMOTE_ADDR']:'',
            'vUserAgent'        => (isset($_SERVER['HTTP_USER_AGENT']))?$_SERVER['HTTP_USER_AGENT']:'',
            'vHost'             => @gethostbyaddr((isset($_SERVER['REMOTE_ADDR']))?$_SERVER['REMOTE_ADDR']:''),
            'dtAddedDate'       => date('Y-m-d H:i:s'),
            'eLoginSuccessful'  => (empty($query_response))?'No':'Yes'
        ]);

        if(empty($query_response)){
            return false;
        }

        session($query_response);
        return true;
    }

    public function get_user(Request $request){

        $request_data   = $request->all();
        $where_cond     = " vUserName LIKE '%".$request_data['q']."%' OR vEmail LIKE '%".$request_data['q']."%'";

        $query_obj_data = DB::table('user')
        ->selectRaw("vEmail as id,CONCAT(vUserName,' [',vEmail,' ]') as text")
        ->whereRaw($where_cond)
        ->orderBy('iUserId','DESC')
        ->get();
        
        $query_response = [];
        if(!empty($query_obj_data)){
            $query_response = json_decode(json_encode($query_obj_data), true);
        }
        echo json_encode($query_response);exit;
    }

    public function logout(Request $request){
        $access_token   = $request->session()->get('accessToken');
        $login_through  = $request->session()->get('login_through');
        $request->session()->flush();

        if($login_through == 'google'){
            Http::get(config("constants.GOOGLE_GRAPH_URL_LOGOUT").$access_token);
        }else{
            Http::get(config("constants.MICROSOFT_GRAPH_URL_LOGOUT").'?post_logout_redirect_uri='.config("constants.MICROSOFT_GRAPH_REDIRECT_URI"));
        }
        return redirect()->route('login_index');
    }
}
