<?php

if (! function_exists('loggedUserData')) {
    function loggedUserData()
    {
        return [
            "name"      => session()->get('userName'),
            "email"     => session()->get('userEmail'),
            "user_id"   => session()->get('iUserId'),
            "first_name"=> session()->get('vFirstName'),
            "last_name" => session()->get('vLastName'),
            "user_name" => session()->get('vUserName'),
            "password" => session()->get('vPassword'),
            "status"    => session()->get('eStatus'),
            "is_admin"  => session()->get('eIsAdmin')
        ];
    }
}