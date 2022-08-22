<?php
return [
    'MICROSOFT_GRAPH_CLIENT_ID' => '03279088-47ec-41a0-975e-f0b4a9d256ea',
    'MICROSOFT_GRAPH_CLIENT_SECRET' => 'R5T8Q~7uoJlGEuCwa040QxL5zaKzJIqsjQXAKcNz',
    'MICROSOFT_GRAPH_REDIRECT_URI' => 'http://localhost:8000/login_sso_action',
    'MICROSOFT_GRAPH_URL_AUTHORIZE' => 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    'LOGIN_REDIRECT_URL' => 'http://localhost:8000',
    'PROFILE_REDIRECT_URL' => 'http://localhost:8000/index',
    'MICROSOFT_GRAPH_URL_ACCESS_TOKENS' => 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    'MICROSOFT_GRAPH_URL_RESOURCEOWNERDETAILS' => '',
    'MICROSOFT_GRAPH_SCOPES' => 'openid profile offline_access user.read mailboxsettings.read calendars.readwrite'
];
?>