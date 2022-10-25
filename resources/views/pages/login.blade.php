<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('image/application-icon.png') }}" type="image/x-icon" />
    <link rel="shortcut icon" href="{{ asset('image/application-icon.png') }}" type="image/x-icon" />
    <title>Login</title>
    <link rel="stylesheet" href="{{ URL::asset('css/login.css') }}" type="text/css" >
</head>
<body>  
    <div id="background-branding-container">
        <img id="login-background-image" src="{{ asset('image/bg-image.jpg') }}" style="width: 1136px; height: 710px;">
    </div>
    <div id="background-branding-overlay" class="overlay ie_legacy" style="visibility: visible; background-color: rgb(0, 114, 198); display: none;"></div>

    <div id="login-container" class="login-container" style="display: block;">
        <table class="login-container-layout">
            <tbody>
                <tr>
                    <td id="login-container-center" style="height: 425px;">
                        <div class="login-form-container">
                            <div class="credentials-container">
                                <div class="org-logo-container">
                                    <img class="logo" src="{{ asset('image/techigai-logo.png') }}">
                                </div>
                                <div class="spacer"></div>
                                <h4 class="login-heading">Login</h4>
                                <p>Please use following login modes to access application</p>
                                <div class="form-group">
                                    <div class="form-horizontal inline-block external-login-button-container">
                                        <a href="login_sso_action" class="btn btn-danger btn-login">Login with Office 365</a>
                                        <a href="login_google_sso_action" class="btn btn-danger btn-login btn-keka-login">Login with Google Account</a>
                                    </div>
                                </div>
                                <div class="clear-side-padding top-margin login-instructions"><p></p></div>
                                <div class="footer-keka-inc">
                                    <span>@ 2022 Dash CRM </span>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>