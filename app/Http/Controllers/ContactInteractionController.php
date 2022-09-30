<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactInteractionController extends Controller
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

        $tmp_ci_obj = str_replace(array("'linked_url'", "'message'","'message_by'", "'connection_status'","'message_status'", "'message_date'","'message_time'", "'processed_date'"),array('"linked_url"', '"message"','"message_by"', '"connection_status"','"message_status"', '"message_date"','"message_time"', '"processed_date"'),$request['ci_obj']);
        
        $ci_obj = json_decode($tmp_ci_obj,true);

        if(empty($ci_obj)){
            return response()->json([
                'success' => 0,
                "message" => "Please send valid json object"
            ], 404);
        }

        $existing_data  = $this->checkExistingData($request);
        $week_names     = ["TODAY","YESTERDAY","SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
        
        if(is_array($ci_obj) && count($ci_obj) > 0){
            foreach($ci_obj as $key => $val){
                if(in_array($val['message_date'],$week_names)){
                    if((date("l") == ucfirst(strtolower($val['message_date']))) || in_array($val['message_date'],["TODAY","YESTERDAY"]) ){
                        $val['message_date'] = date("Y-m-d",strtotime(strtolower($val['message_date'])));
                    }else{
                        $val['message_date'] = date("Y-m-d",strtotime('previous '.strtolower($val['message_date'])));
                    } 
                }else{
                    // $val['message_date'] = date_format(date_create_from_format("M j",$val['message_date']),"Y-m-d");
                    $val['message_date'] = date("Y-m-d",strtotime($val['message_date']));
                }
                
                if(in_array($val['linked_url'],array_column($existing_data,'vLinkedURL'))){
                    $this->updateData($val);
                }else{
                    $this->createData($val);
                }
            }
        }

        return response()->json([
            'success' => 1,
            "message" => "Contact messages data has been added/updated successfully"
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

    public function checkExistingData($input_params = []){
        $return_arr     = [];
        $decode_params  = json_decode(str_replace("'", '"', $input_params['ci_obj']),true);

        if(is_array($decode_params) && count($decode_params) > 0 ){
            $linked_url_arr = array_column($decode_params,'linked_url');

            if(!empty($linked_url_arr)){
                $query_obj_data = DB::table('contact_interaction as ci')
                ->whereIn('vLinkedURL', $linked_url_arr)
                ->get(['vLinkedURL']);

                $return_arr = array_map(function($item) {
                    return (array)$item; 
                }, $query_obj_data->toArray());
            }
        }

        return $return_arr;
    }

    public function createData($input_params = []) {
        if(is_array($input_params) && count($input_params) > 0){
            DB::table('contact_interaction')->insert([
                'vLinkedURL'        => $input_params['linked_url'],
                'tMessage'          => $input_params['message'],
                'vMessageBy'        => $input_params['message_by'],
                'vConnectionStatus' => $input_params['connection_status'],
                'vMessageStatus'    => $input_params['message_status'],
                'dMessageDate'      => $input_params['message_date'],
                'dMessageTime'      => date('H:i:s',strtotime($input_params['message_time'])),
                'dtProcessedDate'   => date_format(date_create($input_params['processed_date']),"Y-m-d H:i:s")
            ]);
        }

        return true;
    }

    public function updateData($input_params = []) {
        if(is_array($input_params) && count($input_params) > 0){
            DB::table('contact_interaction')
            ->where('vLinkedURL', $input_params['linked_url'])  
            ->update(array(
                'tMessage'          => $input_params['message'],
                'vMessageBy'        => $input_params['message_by'],
                'vConnectionStatus' => $input_params['connection_status'],
                'vMessageStatus'    => $input_params['message_status'],
                'dMessageDate'      => $input_params['message_date'],
                'dMessageTime'      => date('H:i:s',strtotime($input_params['message_time'])),
                'dtProcessedDate'   => date_format(date_create($input_params['processed_date']),"Y-m-d H:i:s")
                )
            );
        }

        return true;
    }
}