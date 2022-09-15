<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;

class Dashboard extends BaseController
{
    public function index(){
        $dashboard_data = $this->getDashboardData();
        // return view('pages.dashboard.index',compact(['dashboard_data'=> $dashboard_data]));        
        // return view('pages.dashboard.index')->with(['dashboard_data'=> $dashboard_data]);
        return view('pages.dashboard.index',['dashboard_data'=> $dashboard_data]);
    }

    public function getDashboardData(){
        $select_columns = ['up.iUnreadProfileId as unread_profile_id','up.vProfileName as profile_name','sum(up.iUnreadCount) as unread_count','up.dtProcessedDate as processed_date'];

        $query_obj_data = DB::table('unread_profile as up')
            ->selectRaw(implode(",",$select_columns))
            ->groupBy("vProfileName")
            ->get();

        $unread_response = array_map(function($item) {
            return (array)$item; 
        }, $query_obj_data->toArray());

        $select_unregisteredcolumns = ['ci.vLinkedURL as unregistered_LinkedURL','ci.eConnectionStatus as unregistered_ConnectionStatus'];

        $query_obj_data = DB::table('contact_interaction as ci')
            ->selectRaw(implode(",",$select_unregisteredcolumns))
            ->get();

        $unregistered_response = array_map(function($item) {
            return (array)$item; 
        }, $query_obj_data->toArray());

        $unregistered_response = DB::table('contact_interaction as ci')
            // ->join('contact_interaction as ci','ci.vLinkedURL','!=','c.vLinkedURL','left')
            ->whereRaw("ci.vLinkedURL NOT IN (select c.vLinkedURL from contacts as c where c.vLinkedURL <> null or c.vLinkedURL <> '')")
            ->count();


        $return_arr = [
            'unread_response'       => $unread_response,
            //'unregistered_count'    => $unregistered_response
            'unregistered_response'    => $unregistered_response
        ];

        return $return_arr;
    }
}
