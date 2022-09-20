<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class user_management extends Controller
{
    public function index(){
        $user_data = $this->getUser();
    }

    public function getUser(){
        
        $query_obj_data = DB::table('user')
        ->orderBy('iUserId','DESC')
        ->get();
        
        $query_response = json_decode(json_encode($query_obj_data), true);
        return !empty($query_response)?$query_response:[];
    }
}
