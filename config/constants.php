<?php


$constant_arr = [
    'MICROSOFT_GRAPH_CLIENT_ID' => '03279088-47ec-41a0-975e-f0b4a9d256ea',
    'MICROSOFT_GRAPH_CLIENT_SECRET' => 'R5T8Q~7uoJlGEuCwa040QxL5zaKzJIqsjQXAKcNz',
    'MICROSOFT_GRAPH_URL_AUTHORIZE' => 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    'MICROSOFT_GRAPH_URL_ACCESS_TOKENS' => 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    'MICROSOFT_GRAPH_URL_LOGOUT' => 'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
    'MICROSOFT_GRAPH_URL_RESOURCEOWNERDETAILS' => '',
    'MICROSOFT_GRAPH_SCOPES' => 'openid profile offline_access user.read mailboxsettings.read calendars.readwrite'
];

if(env('APP_ENV') == 'local'){
    $constant_arr['MICROSOFT_GRAPH_REDIRECT_URI']   = 'http://localhost:8000/login_sso_action';
    $constant_arr['LOGIN_REDIRECT_URL']             = 'http://localhost:8000';
    $constant_arr['PROFILE_REDIRECT_URL']           = 'http://localhost:8000/index';
}else if(env('APP_ENV') == 'ccrm.techigai.ga'){
    $constant_arr['MICROSOFT_GRAPH_REDIRECT_URI']   = 'https://ccrm.techigai.ga/login_sso_action';
    $constant_arr['LOGIN_REDIRECT_URL']             = 'http://ccrm.techigai.ga';
    $constant_arr['PROFILE_REDIRECT_URL']           = 'http://ccrm.techigai.ga/index';
}

return $constant_arr;
?>