<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class unreadProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json([
            "message" => "Please use post method for this API's"
        ], 404);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function store(Request $request)
    {
        $rules = [
            'ci_obj' => [
                'required'  => true,
                'message'   => "Please pass values for CI OBJ"
                ]
            ];
        
        $valid_response = $this->validateRequest($request,$rules);
        
        if(!empty($valid_response)){
            $output_response = [
                'success' => 0,
                'message' => $valid_response
            ];
            return response()->json([
                'success' => 0,
                "message" => $valid_response
            ], 404);
        }

        $tmp_ci_obj = str_replace(array("'profile_name'", "'unread_count'","'processed_date'"),array('"profile_name"', '"unread_count"','"processed_date"'),$request['ci_obj']);
        
        $ci_obj = json_decode($tmp_ci_obj,true);
        
        if(empty($ci_obj)){
            return response()->json([
                'success' => 0,
                "message" => "Please send valid json object"
            ], 404);
        }

        if(is_array($ci_obj) && count($ci_obj) > 0){
            
            DB::table('unread_profile')->truncate();
            
            foreach($ci_obj as $key => $val){
                $this->createData($val);
            }
        }

        return response()->json([
            'success' => 1,
            "message" => "Profile Unread message count has been added successfully"
        ], 200);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function validateRequest($input_params = [] , $rules = []){
        $return_arr = [];
        
        if(is_array($rules) && count($rules) > 0){
            foreach($rules as $key => $val){
                if(!isset($input_params[$key]) || $input_params[$key] == ''){
                    $return_arr[$key] = $rules[$key]['message'];
                }
            }
        }
        return $return_arr;
    }

    public function createData($input_params = []) {
        
        if(is_array($input_params) && count($input_params) > 0){
            DB::table('unread_profile')->insert([
                'vProfileName'      => $input_params['profile_name'],
                'iUnreadCount'      => $input_params['unread_count'],
                'dtProcessedDate'   => date_format(date_create($input_params['processed_date']),"Y-m-d H:i:s")
            ]);
        }

        return true;
    }
}
