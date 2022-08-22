<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use TokenCache;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;

include_once('TokenCache.php');

class Contact extends BaseController
{
    public function index(Request $request){
        $enum_values = $this->getEnumValues();
        return view('pages.contact.contact_list',compact('enum_values'));        
    }

    public function get(Request $request){
        $request_data = $request->all();
        
        $select_columns = ['c.iContactsId as contact_id','ci.iContactInteractionId as contact_interaction_id','o.iOrganizationId as organization_id','c.eStatus as communication_status','c.dtStatusDate as status_date','c.dtLastConversationDate as last_conv_date','c.tDiscussionPoints as discussion_points','c.vNextSteps as next_steps','c.dtNextActionDate as next_action_date','c.vContactName as contact_name','c.eRelationshipStatus as relationship_status','c.vDesignation as designation','c.vReportingManager as reporting_manager','o.vName as organization_name','o.vWebsite as website','c.vPreviousRelationShip as previous_relationship','o.vIndustry as industry','mscc.vCityName as city_name','mss.vStateName as state_name','msc.vCountryName as country_name','c.vLinkedURL as linked_url','c.vEmail as email','c.eReachoutCategory as reachout_category','c.vWorkNumber as work_number','c.vMobileNumber as mobile_number','c.eCategory as category','c.eTouchPoints as touch_points','c.eAdaptability as adaptability','c.eDispositionTowards as disposition_towards','c.eCoverage as coverage','c.tResponse as response','ci.tMessage as message','ci.vMessageBy as message_by','ci.eConnectionStatus as connection_status','ci.eMessageStatus as message_status','ci.dMessageDate as message_date','ci.dMessageTime as message_time'];

        $query_obj_data = DB::table('contacts as c')
            ->join('organization as o','o.iOrganizationId','=','c.iOrganizationId','left')
            // ->join('contact_interaction as ci','ci.vLinkedURL','=','c.vLinkedURL','left')
            // ->join(DB::raw('contact_interaction as ci on (ci.vLinkedURL = c.vLinkedURL OR ci.iContactId = c.iContactsId'),'left')
            ->leftJoin('contact_interaction as ci', function($join) {
                $join->on('ci.vLinkedURL', '=', 'c.vLinkedURL');
                $join->orOn('ci.iContactId', '=','c.iContactsId');
            })
            ->join('mst_country as msc','msc.iCountryId','=','o.iCountryId','left')
            ->join('mst_state as mss','mss.iStateId','=','o.iStateId','left')
            ->join('mst_city as mscc','mscc.iCityId','=','o.iCityId','left')
            ->get($select_columns);

        $query_response = array_map(function($item) {
            return (array)$item; 
        }, $query_obj_data->toArray());

        $output = array(
            'data'  =>	$query_response
        );

        echo json_encode($output);exit;
    }

    public function update_data(Request $request){
        $request_data   = $request->all();

        $row_id         = $request_data[0][0];
        $field_name     = $request_data[0][1];
        $old_value      = $request_data[0][2];
        $new_value      = $request_data[0][3];
        $db_name        = $request_data[0][4];
        $db_table       = $request_data[0][5];
        $data_type      = $request_data[0][6];
        $linked_url     = $request_data[0][7];
        $org_website    = $request_data[0][8];
        $contact_id     = $request_data[0][9];
        $organization_id= $request_data[0][10];
        $ci_id          = $request_data[0][11];
        
        if($data_type == 'date'){
            $new_value = date_format(date_create($new_value),"Y-m-d H:i:s");
        }else if($data_type == 'time'){
            $new_value = date('H:i:s',strtotime($new_value));
        }

        switch($db_table){
            case 'contacts':
                $return_arr = ['success' => 0];

                // if($old_value == '' && $field_name == 'linked_url'){
                if(!isset($contact_id) || $contact_id == ''){
                    $db_response = DB::table('contacts')->insertGetId([
                        $db_name            => $new_value,
                        // 'iOrganizationId'   => ($organization_id != '')?$organization_id:'',
                        'iAddedById'        => loggedUserData()['user_id'],
                        'iUpdatedById'      => loggedUserData()['user_id'],
                        'dtAddedDate'       => date('Y-m-d H:i:s'),
                        'dtUpdatedDate'     => date('Y-m-d H:i:s')
                    ]);

                    if($db_response){
                        $return_arr = ['success' => 1,'insert_id'=>$db_response,'db_table'=>'contacts'];
                    }            
                }else{    
                    $db_response = DB::table('contacts')
                    ->where('iContactsId', $contact_id)  
                    ->update(array(
                        $db_name        => $new_value,
                        'iUpdatedById'  => loggedUserData()['user_id'],
                        'dtUpdatedDate' => date('Y-m-d H:i:s')
                    ));
                    
                    if($db_response){
                        $return_arr = ['success' => 1];
                    }
                }
                break;
            case 'organization':
                $return_arr = ['success' => 0];

                if(!isset($organization_id) || $organization_id == ''){
                    $db_response = DB::table('organization')->insertGetId([
                        $db_name        => $new_value,
                        'iAddedById'    => loggedUserData()['user_id'],
                        'iUpdatedById'  => loggedUserData()['user_id'],
                        'dtAddedDate'   => date('Y-m-d H:i:s'),
                        'dtUpdatedDate' => date('Y-m-d H:i:s')
                    ]);

                    if($db_response){
                        $return_arr = ['success' => 1,'insert_id'=>$db_response,'db_table'=>'organization'];
                    }

                    if($contact_id != ''){
                        $db_response = DB::table('contacts')
                        ->where('iContactsId', $contact_id)  
                        ->update(array(
                            'iOrganizationId'   => $db_response,
                            'iUpdatedById'      => loggedUserData()['user_id'],
                            'dtUpdatedDate'     => date('Y-m-d H:i:s')
                        ));
                    }
                }else{    
                    $db_response = DB::table('organization')
                    ->where('iOrganizationId', $organization_id)  
                    ->update(array(
                        $db_name        => $new_value,
                        'iUpdatedById'  => loggedUserData()['user_id'],
                        'dtUpdatedDate' => date('Y-m-d H:i:s')
                    ));
                    
                    if($db_response){
                        $return_arr = ['success' => 1];
                    }
                }
                break;
            case 'contact_interaction':
                if($contact_id != ''){
                    $query_obj_data = DB::table('contact_interaction')->where('iContactId',$contact_id)->get();
                }else{
                    $query_obj_data = DB::table('contact_interaction')->where('vLinkedURL',$linked_url)->get();
                }

                $ci_data_exist = array_map(function($item) {
                    return (array)$item; 
                }, $query_obj_data->toArray());
                
                $return_arr = ['success' => 0];

                if(empty($ci_data_exist)){
                    $db_response = DB::table('contact_interaction')->insertGetId([
                        'vLinkedURL'    => ($linked_url != '')?$linked_url:'',
                        'iContactId'    => ($contact_id != '')?$contact_id:'',
                        $db_name        => $new_value,
                        'iAddedById'    => loggedUserData()['user_id'],
                        'iUpdatedById'  => loggedUserData()['user_id'],
                        'dtAddedDate'   => date('Y-m-d H:i:s'),
                        'dtUpdatedDate' => date('Y-m-d H:i:s')
                    ]);
                    
                    if($db_response){
                        $return_arr = ['success' => 1,'insert_id'=>$db_response,'db_table'=>'contact_interaction'];
                    }
                }else{
                    $db_response = DB::table('contact_interaction')
                    ->where('iContactId', $contact_id)  
                    ->update(array(
                        $db_name        => $new_value,
                        'iUpdatedById'  => loggedUserData()['user_id'],
                        'dtUpdatedDate' => date('Y-m-d H:i:s')
                    ));
                    
                    if($db_response){
                        $return_arr = ['success' => 1];
                    }
                }
                break;
            default:
                $return_arr = ['success' => 0];
                break;
        }
        echo json_encode($return_arr);exit;
    }

    protected function getEnumValues(){
        $query_string   =  "SHOW COLUMNS FROM contacts WHERE Field IN ('eStatus','eRelationshipStatus','eReachoutCategory','eCategory','eAdaptability','eDispositionTowards','eCoverage','eTouchPoints')";
        $query_response = DB::select($query_string);

        $return_arr     = []; 

        if(is_array($query_response) && count($query_response) > 0){
            foreach($query_response as $val){
                if(in_array($val->Field,['eTouchPoints','eReachoutCategory'])){
                    preg_match("/^set\(\'(.*)\'\)$/", $val->Type, $matches);
                }else{
                    preg_match("/^enum\(\'(.*)\'\)$/", $val->Type, $matches);
                }
                $return_arr[$val->Field] = explode("','", $matches[1]);
            }
        }

        
        $query_string   =  "SHOW COLUMNS FROM contact_interaction WHERE Field IN ('eConnectionStatus','eMessageStatus')";
        $query_response = DB::select($query_string);

        if(is_array($query_response) && count($query_response) > 0){
            foreach($query_response as $val){
                preg_match("/^enum\(\'(.*)\'\)$/", $val->Type, $matches);
                $return_arr[$val->Field] = explode("','", $matches[1]);
            }
        }
        
        // $mst_c_query_obj = DB::table('mst_country')
        //     ->where('eStatus','Active')
        //     ->get(['iCountryId','vCountryName','vCountryCode']);

        // $country_data = array_map(function($item) {
        //     return (array)$item; 
        // }, $mst_c_query_obj->toArray());


        return $return_arr;
    } 

    public function set_remainder(Request $request){
        $request_data   = $request->all();
        $notes          = $request_data['notes'];
        $request_data['remainder_date_time'] = date("Y-m-d H:i:s",strtotime(str_replace('/', '-',$request_data['remainder_date_time'])));
        
        $reminder_response = $this->createRemainder($request_data);

        if(!empty($reminder_response)){
            DB::table('set_reminder')->insert([
                'dtRemainderDateTime'   => $request_data['remainder_date_time'],
                'tNotes'                => $notes,
                'dtAddedDate'           => date('Y-m-d H:i:s'),
                'dtUpdatedDate'         => date('Y-m-d H:i:s'),
                'vContactsLinkedURL'    => ($request_data['contacts'] != '')?$request_data['contacts']:'',
                'tCalUid'               => $reminder_response['cal_uid'],
                'vOutlookId'            => $reminder_response['outlook_id'],
                'tSubject'              => $reminder_response['subject'],
                'iAddedById'            => loggedUserData()['user_id'],
                'iUpdatedById'          => loggedUserData()['user_id']
            ]);
        }
        echo json_encode(['success'=>1]);exit;
    }

    public function createRemainder($input_params = []){      
        
        $remainder_date_time = date('Y-m-d', strtotime($input_params['remainder_date_time'])).'T'.date('H:i:s', strtotime($input_params['remainder_date_time'])).'.0000000'; 
        $reminder_subject    = "Linked CRM Personal Reminder"; 
        if($input_params['contacts_name'] != ''){
            $reminder_subject    = "Linked CRM Personal Reminder for ". $input_params['contacts_name'];
        }

        $newEvent = [
            'subject' => $reminder_subject,
            'start' => [
                'dateTime' => $remainder_date_time,
                'timeZone' => 'India Standard Time'
            ],
            'end' => [
                'dateTime' => $remainder_date_time,
                'timeZone' => 'India Standard Time'
            ],
            'body' => [
                'content' => $input_params['notes'],
                'contentType' => 'html'
            ],
            "location"=>[
                "displayName"=>"Personal Reminder"
            ],
            "allowNewTimeProposals"=> true,
            "isOnlineMeeting"=> false,
            "onlineMeetingProvider"=> "teamsForBusiness"
        ];

        // POST /me/events
        
        $graph = $this->getGraph();
        $resultCreateEvent = $graph->createRequest('POST', '/me/events')
        ->attachBody($newEvent)
        ->setReturnType(Model\Event::class)
        ->execute();         
        
        return [
            'cal_uid'       => $resultCreateEvent->getiCalUId(),
            'outlook_id'    => $resultCreateEvent->getId(),
            'subject'       => $reminder_subject
        ];
    }
    
    private function getGraph(): Graph
    {
        // Get the access token from the cache
        $tokenCache     = new TokenCache();
        $accessToken    = $tokenCache->getAccessToken();

        // Create a Graph client
        $graph  = new Graph();
        $graph->setAccessToken($accessToken);
        return $graph;
    }

    public function fetch_reminder_count(){
        
        $query_response = DB::table('set_reminder')
        ->selectRaw("sum(if(vContactsLinkedURL!= '',1,0)) as contact_reminder,sum(if(vContactsLinkedURL= '',1,0)) as date_reminder,count(*) as total_count")
        ->where(DB::raw("DATE_FORMAT(dtRemainderDateTime,'%Y-%m-%d %H:%i')"), '>=',date('Y-m-d H:i'))
        ->first();
        
        echo json_encode($query_response);exit;
    }

    public function reminder(Request $request){

        $where_cond = '1=1';
        if(isset($request->all()['type'])){
            if($request->all()['type'] == 'contact'){
                $where_cond = "vContactsLinkedURL != ''";
            }else if($request->all()['type'] == 'date'){
                $where_cond = "vContactsLinkedURL = '' ";
            }
        }

        $query_obj_data = DB::table('set_reminder')
        ->selectRaw("*,DATE_FORMAT(dtRemainderDateTime,'%d/%m/%Y') as reminder_date,DATE_FORMAT(dtRemainderDateTime,'%H:%i') as reminder_time")
        ->whereRaw($where_cond)
        ->where(DB::raw("DATE_FORMAT(dtRemainderDateTime,'%Y-%m-%d %H:%i')"), '>=',date('Y-m-d H:i'))
        ->get();
        
        $query_response = json_decode(json_encode($query_obj_data), true);
        $tmp_query_resp = [];
        if(is_array($query_response) && count($query_response) > 0){
            foreach($query_response as $key => $val){
                $tmp_query_resp[$val['reminder_date']][] = $val;
            }
        }

        return view('pages.contact.reminder_list',['data'=> $tmp_query_resp]);
    }
}
