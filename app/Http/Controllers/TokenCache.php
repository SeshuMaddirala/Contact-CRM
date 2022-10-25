<?php
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// namespace TokenStore;
// this is one is to be included in calendar
//storing the tokens which is to implement a way to store them in the app 

use Illuminate\Foundation\Console\VendorPublishCommand;
// use App\Http\Controllers\login;

// include_once('Login.php');

class TokenCache {
  
    public function storeTokens($accessToken, $user,$login_through = '') {
    
        if($login_through == 'google'){
            $sso_data = [
                'accessToken'   => $accessToken['access_token'],
                'refreshToken'  => $accessToken['refresh_token'],
                'tokenExpires'  => $accessToken['expires_in'],
                'userName'      => $user->name,
                'userEmail'     => null !== $user->email ? $user->email : $user->name,
                'userTimeZone'  => $accessToken['timezone'],
            ];
        }else{
            $sso_data = [
                'accessToken'   => $accessToken->getToken(),
                'refreshToken'  => $accessToken->getRefreshToken(),
                'tokenExpires'  => $accessToken->getExpires(),
                'userName'      => $user->getDisplayName(),
                'userEmail'     => null !== $user->getMail() ? $user->getMail() : $user->getUserPrincipalName(),
                'userTimeZone'  => $user->getMailboxSettings()->getTimeZone()
            ];
        }
        session($sso_data);
    }

    public function clearTokens() {
        session()->forget('accessToken');
        session()->forget('refreshToken');
        session()->forget('tokenExpires');
        session()->forget('userName');
        session()->forget('userEmail');
        session()->forget('userTimeZone');
        session()->forget('login_through');
        session()->forget('token_data');
    }

    /**
     * Get Access Token
     */
    public function getAccessToken() {
        // Check if tokens exist
        if (empty(session()->get('accessToken')) ||
            empty(session()->get('refreshToken')) ||
            empty(session()->get('tokenExpires'))) {
            return '';
        }

        if(session()->get('login_through') == 'google'){
            $access_token   = $this->googleAccessToken();
        }else{
            $access_token   = $this->outlookAccessToken();
        }
        return $access_token;
    }

    public function googleAccessToken(){

        $client     = new Google\Client(config("constants.google"));
        $accessToken= session()->get('token_data');
        
        if(!empty($accessToken)){
            $client->setAccessToken($accessToken);
        }

        if ($client->isAccessTokenExpired()) {
            // Refresh the token if possible, else fetch a new one.
            if ($client->getRefreshToken()) {
                $access_token_data = $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
                $client->setAccessToken($access_token_data);
                session([
                    'accessToken'   => $access_token_data['access_token'],
                    'refreshToken'  => $access_token_data['refresh_token'],
                    'tokenExpires'  => $access_token_data['expires_in'],
                    'token_data'    => $access_token_data
                ]);
            } 

            // else {
            //     // Request authorization from the user.
            //     $authUrl    = $client->createAuthUrl();
            //     echo $authUrl;
            //     $response   = Http::get($authUrl);
            //     pr($response->getBody(),1);

            //     // Exchange authorization code for an access token.
            //     $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            //     $client->setAccessToken($accessToken);

            //     session([
            //         'accessToken'   => $client->getAccessToken()['access_token'],
            //         'refreshToken'  => $client->getAccessToken()['refresh_token'],
            //         'tokenExpires'  => $client->getAccessToken()['expires_in'],
            //         'token_data'    => $accessToken
            //     ]);
            // }
        }

        // if ($client->isAccessTokenExpired()) {
        //     // fetch new access token
        //     $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        //     $client->setAccessToken($client->getAccessToken());
        
        //     session([
        //         'accessToken'   => $client->getAccessToken()['access_token'],
        //         'refreshToken'  => $client->getAccessToken()['refresh_token'],
        //         'tokenExpires'  => $client->getAccessToken()['expires_in']
        //     ]);

        //     $access_token = $client->getAccessToken()['access_token'];
        // }
        
        return $accessToken;
    }

    public function outlookAccessToken(){

        $access_token   = session()->get('accessToken');
        
        // Check if token is expired
        $now = time() + 300; //Get current time + 5 minutes (to allow for time differences)
        
        if (session()->get('tokenExpires') <= $now) {
            // Token is expired (or very close to it)
            // so let's refresh

            $oauthClient = $login->getOutlookClient();
            try {
                $newToken=$oauthClient->getAccessToken('refresh_tolken', [
                    'refresh_token' => session()->get('refreshtoken')
                ]);

                // Store the new values
                $this->updateTokens($newToken);

                $access_token = $newToken->getToken();
            }
            catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                $access_token = '';
            }
        }
        return $access_token;
    }
    
    /**
     * Update Token 
     */
    public function updateTokens($accessToken) {
        session([
            'accessToken'   => $accessToken->getToken(),
            'refreshToken'  => $accessToken->getRefreshToken(),
            'tokenExpires'  => $accessToken->getExpires()
        ]);
    }
}
