<?php


$constant_arr = [
    'MICROSOFT_GRAPH_CLIENT_ID'     => '03279088-47ec-41a0-975e-f0b4a9d256ea',
    'MICROSOFT_GRAPH_CLIENT_SECRET' => 'R5T8Q~7uoJlGEuCwa040QxL5zaKzJIqsjQXAKcNz',
    'MICROSOFT_GRAPH_URL_AUTHORIZE' => 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    'MICROSOFT_GRAPH_URL_ACCESS_TOKENS' => 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    'MICROSOFT_GRAPH_URL_LOGOUT'    => 'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
    'MICROSOFT_GRAPH_URL_RESOURCEOWNERDETAILS' => '',
    'MICROSOFT_GRAPH_SCOPES'        => 'openid profile offline_access user.read mailboxsettings.read calendars.readwrite',
    'GOOGLE_CLIENT_ID'              => '528148396387-7j69pba2ahjpkdk3disjt8p6rmdhimdi.apps.googleusercontent.com',
    'GOOGLE_CLIENT_SECRET'          => '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',
    'GOOGLE_GRAPH_URL_LOGOUT'       => 'https://accounts.google.com/o/oauth2/revoke?token=',
    'GOOGLE_SCOPES'                 => [
        \Google\Service\Oauth2::USERINFO_PROFILE,
        \Google\Service\Oauth2::USERINFO_EMAIL,
        \Google\Service\Oauth2::OPENID,
        \Google\Service\Calendar::CALENDAR
        // \Google\Service\Drive::DRIVE_METADATA_READONLY // allows reading of google drive metadata
    ],
    'GOOGLE_ACCESS_TYPE'            => 'offline',
    'GOOGLE_APPROVAL_PROMPT'        => 'force',
    'GOOGLE_INCLUDE_GRANTED_SCOPE'  => true
];

if(env('APP_ENV') == 'local'){
    $constant_arr['MICROSOFT_GRAPH_REDIRECT_URI']   = 'http://localhost:8000/login_sso_action';
    $constant_arr['LOGIN_REDIRECT_URL']             = 'http://localhost:8000';
    $constant_arr['PROFILE_REDIRECT_URL']           = 'http://localhost:8000/index';
    $constant_arr['GOOGLE_REDIRECT_URI']            = 'http://localhost:8000/login_google_sso_action';
}else if(env('APP_ENV') == 'ccrm.techigai.ga'){
    $constant_arr['MICROSOFT_GRAPH_REDIRECT_URI']   = 'https://ccrm.techigai.ga/login_sso_action';
    $constant_arr['LOGIN_REDIRECT_URL']             = 'http://ccrm.techigai.ga';
    $constant_arr['PROFILE_REDIRECT_URL']           = 'http://ccrm.techigai.ga/index';
    $constant_arr['GOOGLE_REDIRECT_URI']            = 'https://ccrm.techigai.ga/login_google_sso_action';
}        

$constant_arr['google'] = [
    'client_id'         => $constant_arr["GOOGLE_CLIENT_ID"],
    'client_secret'     => $constant_arr["GOOGLE_CLIENT_SECRET"],
    'scopes'            => $constant_arr["GOOGLE_SCOPES"],
    'redirect_uri'      => $constant_arr["GOOGLE_REDIRECT_URI"],
    'access_type'       => $constant_arr["GOOGLE_ACCESS_TYPE"],
    'approval_prompt'   => $constant_arr["GOOGLE_APPROVAL_PROMPT"],
    'include_granted_scopes' => $constant_arr["GOOGLE_INCLUDE_GRANTED_SCOPE"]
];

return $constant_arr;
?>