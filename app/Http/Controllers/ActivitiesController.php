<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivitiesController extends Controller
{
    public function index(){
        return view('pages.activities.index');
    }

    public function fetch_activities(Request $request){
        $request_data   = $request->all();
        $start_date     = str_replace('/', '-', $request_data['start_date']);
        $end_date       = str_replace('/', '-', $request_data['end_date']);
        $where_cond     = " DATE_FORMAT(a.dtPerformedDate,'%Y-%m-%d') BETWEEN '".date('Y-m-d',strtotime($start_date))."' AND '".date('Y-m-d',strtotime($end_date))."'";

        if(loggedUserData()['is_admin'] != 'Yes'){
            $where_cond .= " AND a.iAddedById = '".loggedUserData()['user_id']."'"; 
        }

        $query_obj_data = DB::table('activities as a')
        ->join('activities_template as at','at.vActivitiesCode','=','a.vActivitiesCode','left')
        ->selectRaw("a.*,at.*,DATE_FORMAT(a.dtPerformedDate,'%d/%m/%Y') as reminder_date,DATE_FORMAT(a.dtPerformedDate,'%D	%b %Y') as format_reminder_date,DATE_FORMAT(a.dtPerformedDate,'%H:%i:%s') as reminder_time,DATE_FORMAT(a.dtPerformedDate,'%H:%i:%s') as format_reminder_time")
        ->whereRaw($where_cond)
        // ->where('a.iAddedById',loggedUserData()['user_id'])
        ->orderBy('a.dtPerformedDate','DESC')
        ->get();
        
        $query_response = json_decode(json_encode($query_obj_data), true);

        $tmp_query_resp = [];
        if(is_array($query_response) && count($query_response) > 0){
            foreach($query_response as $key => $val){
                if(!empty($val['tParams'])){
                    $decode_params = json_decode($val['tParams'],true);
                    foreach($decode_params as $p_key => $value){
                        $val['tTemplate'] = str_replace("#".$p_key."#", $value , $val['tTemplate']);
                    }
                }   
                $tmp_query_resp[$val['reminder_date']][] = $val;
            }
        }
        echo json_encode($tmp_query_resp);exit;
    }
}
