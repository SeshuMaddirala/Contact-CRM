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

if (! function_exists('getUserData')) {
    function getUserData($user_id = '')
    {
        if(!isset($user_id) || $user_id == ''){
            return [];
        }
        
        $query_obj_data = DB::table('user')
        ->where('iUserId',$user_id)
        ->get();

        $query_response = [];
        if(!empty($query_obj_data)){
            $query_response = json_decode(json_encode($query_obj_data[0]), true);
        }
        
        return $query_response;
    }
}


if(! function_exists('pr')){
    function pr($data = [],$exist_flag = false){
        echo "<pre>";
        print_r($data);
        if($exist_flag){
            exit;
        }
    }
}