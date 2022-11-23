<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use TokenCache;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;
use Google;
// use phpDocumentor\Reflection\Types\Null_;
use Illuminate\Support\Facades\Storage;

include_once('TokenCache.php');

class Contact extends BaseController
{
    public function index(Request $request){
        $default_column     = $this->defaultColumns();
        $logged_filter_data = $this->getFilterLogData();
        $hidden_column_id   = array_keys(array_column($default_column, 'hide_column'), 'true');
        
        $column_source_data = [];
        foreach($default_column as $d_key => $d_val){
            if(!empty($d_val['source_data'])){
                $column_source_data[$d_val['db_name']] = $d_val['source_data'];
            }

            if($d_val['db_name'] == 'vAlertsTo'){//Quick Fix for now
                $query_obj_data = DB::table('user')
                ->selectRaw("vEmail")
                ->orderBy('iUserId','DESC')
                ->get();
                    
                $query_response = [];
                if(!empty($query_obj_data)){
                    $query_response = json_decode(json_encode($query_obj_data), true);
                    $query_response = !empty($query_response)?array_column($query_response,'vEmail'):[];
                }
                $default_column[$d_key]['source_data'] = !empty($query_response)?$query_response:[];
            }
        }

        return view('pages.contact.contact_list',
        ['column_source_data'=> $column_source_data,'default_column'=> $default_column,'filter_data' => $logged_filter_data,'hidden_column_id' => $hidden_column_id]);        
    }

    public function get(Request $request){
        $request_data   = $request->all();
        $custom_filter  = isset($request_data['custom_filter'])?$request_data['custom_filter']:[];
        $global_filter  = isset($request_data['global_filter'])?$request_data['global_filter']:[];

        $where_cond     = '1=1';
        
        if(!empty($global_filter) && (isset($global_filter['start_date']) && $global_filter['start_date'] != '') && (isset($global_filter['start_date']) && $global_filter['end_date'] != '')){
            $start_date = str_replace('/', '-', $global_filter['start_date']);
            $end_date   = str_replace('/', '-', $global_filter['end_date']);

            $where_cond = " DATE_FORMAT(c.dtAddedDate,'%Y-%m-%d') BETWEEN '".date('Y-m-d',strtotime($start_date))."' AND '".date('Y-m-d',strtotime($end_date))."'";
        }

        if(!empty($custom_filter)){
            foreach($custom_filter as $extra_val){
                $table_alias        = ($extra_val['table_name'] == 'contact_interaction')?"ci":"c";
                $temp_where_cond    = '';

                if($extra_val['filter_type'] == 'date'){
                    $temp_where_cond .= " AND "." DATE_FORMAT(".$table_alias.'.'.$extra_val['filter_column'].",'%Y-%m-%d')";
                }else{
                    $temp_where_cond .= " AND ".$table_alias.'.'.$extra_val['filter_column'];
                }
                switch($extra_val['filter_type']){
                    case 'equal_to':
                        if(is_array($extra_val['filter_value'])){
                            $temp_where_cond    = " AND ( ";
                            $temp_wc_arr        = [];
                            foreach($extra_val['filter_value'] as $filter_val){
                                $temp_wc_arr[] = 'FIND_IN_SET("'.$filter_val.'",'.$table_alias.'.'.$extra_val['filter_column'].")";
                            }

                            $temp_where_cond .= implode(' OR ',$temp_wc_arr)." ) ";
                        }else{
                            $temp_where_cond .= ' = "'.$extra_val['filter_value'].'"';
                        }
                        break;
                    case 'not_equal_to':
                        if(is_array($extra_val['filter_value'])){
                            $temp_where_cond    = " AND ( ";
                            $temp_wc_arr        = [];
                            foreach($extra_val['filter_value'] as $filter_val){
                                $temp_wc_arr[] = '!FIND_IN_SET("'.$filter_val.'",'.$table_alias.'.'.$extra_val['filter_column'].")";
                            }

                            $temp_where_cond .= implode(' AND ',$temp_wc_arr)." ) ";
                        }else{
                            $temp_where_cond .= ' != "'.$extra_val['filter_value'].'"';
                        }
                        break;
                    case 'begins_with':
                        $temp_where_cond .= ' LIKE "'.$extra_val['filter_value'].'%"';
                        break;
                    case 'ends_with':
                        $temp_where_cond .= ' LIKE "%'.$extra_val['filter_value'].'"';
                        break;
                    case 'contains':
                        $temp_where_cond .= ' LIKE "%'.$extra_val['filter_value'].'%"';
                        break;
                    case 'does_not_contains':
                        $temp_where_cond .= ' NOT LIKE "%'.$extra_val['filter_value'].'%"';
                        break;
                    default:
                        if($extra_val['filter_type'] == 'date'){
                            $filter_date    = explode(' - ',$extra_val['filter_value']);
                            $temp_where_cond    .= " BETWEEN '".date('Y-m-d',strtotime($filter_date[0]))."' AND '".date('Y-m-d',strtotime($filter_date[1]))."'";
                        }
                    break;
                }

                $where_cond .= $temp_where_cond; 
            }
        }
        
        $select_columns = ['c.iContactsId','ci.iContactInteractionId','c.vStatus','date_format(c.dtStatusDate,"%d/%m/%Y")as dtStatusDate','date_format(c.dtLastConversationDate,"%d/%m/%Y") as dtLastConversationDate','c.tDiscussionPoints','c.vNextSteps','date_format(c.dtNextActionDate,"%d/%m/%Y") as dtNextActionDate','c.vContactName','c.vRelationshipStatus','c.vDesignation','c.vReportingManager','c.vOrganizationName','c.vWebsite','c.vPreviousRelationShip','c.vIndustry','c.vCityName','c.vStateName','c.vCountryName','c.vLinkedURL','c.vEmail','c.vReachoutCategory','c.vWorkNumber','c.vMobileNumber','c.vCategory','c.vTouchPoints','c.vAdaptability','c.vDispositionTowards','c.vCoverage','c.tResponse','ci.tMessage','ci.vMessageBy','ci.vConnectionStatus','ci.vMessageStatus','date_format(ci.dMessageDate,"%d/%m/%Y") as dMessageDate','ci.dMessageTime','c.vHometownState','c.vAlertsTo'];

        if(loggedUserData()['is_admin'] != 'Yes'){
            $where_cond .= " AND c.iAddedById = '".loggedUserData()['user_id']."'"; 
        }

        $query_obj_data = DB::table('contacts as c')
            ->leftJoin('contact_interaction as ci', function($join) {
                $join->on('ci.vLinkedURL', '=', 'c.vLinkedURL');
                $join->orOn('ci.iContactId', '=','c.iContactsId');
            })
            ->whereRaw($where_cond)
            // ->where('c.iAddedById',loggedUserData()['user_id'])
            ->orderBy('c.iContactsId', 'ASC')
            ->get(DB::raw(implode(',',$select_columns)));

        $query_response = array_map(function($item) {
            return (array)$item; 
        }, $query_obj_data->toArray());

        $output = array(
            'data'              => $query_response,
            'logged_filter_data'=> []
        );

        /**
         * Log filter data
         */
        if(!in_array($request_data['call_from'],['onload'])){
            $this->logFilterData($request_data);
            $output['logged_filter_data'] = $this->getFilterLogData();
        }

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
        $contact_id     = $request_data[0][8];
        $ci_id          = $request_data[0][9];
        $column_title   = $request_data[0][10];
        $contact_name   = $request_data[0][11];
        $alerts_to      = $request_data[0][12];
    
        if($data_type == 'date'){
            if(isset($new_value) && $new_value != ''){
                $new_value = date('Y-m-d', strtotime(str_replace('/', '-', $new_value)));
            }
        }else if($data_type == 'time'){
            if(isset($new_value) && $new_value != ''){
                $new_value = date('H:i:s',strtotime($new_value));
            }
        }

        if($db_name == 'vLinkedURL' && $new_value != ''){
            $contact_query_obj = DB::table('contacts')->where('vLinkedURL',$new_value)->get();
            
            $contact_data_exist = array_map(function($item) {
                return (array)$item; 
            }, $contact_query_obj->toArray());

            if(!empty($contact_data_exist)){
                echo json_encode(['success' => 0,'message'=> 'LinkedIn data is already existed in the system.']);exit;
            }
        }

        switch($db_table){
            case 'contacts':
                $return_arr = ['success' => 0];

                if(!isset($contact_id) || $contact_id == ''){
                    $db_inert_id = DB::table('contacts')->insertGetId([
                        $db_name            => $new_value,
                        'iAddedById'        => loggedUserData()['user_id'],
                        'iUpdatedById'      => loggedUserData()['user_id'],
                        'dtAddedDate'       => date('Y-m-d H:i:s'),
                        'dtUpdatedDate'     => date('Y-m-d H:i:s')
                    ]);

                    if($db_inert_id){
                        $return_arr     = ['success' => 1,'insert_id'=>$db_inert_id,'db_table'=>'contacts'];

                        $params_obj     = [
                            "column_name"   => $column_title,
                            "contact_id"    => $db_inert_id,
                            "value"         => $new_value,
                            "performed_by"  => loggedUserData()['name'],
                            "performed_by_id"=> loggedUserData()['user_id']
                        ];
                        $this->addActivities('contacts',$db_inert_id,json_encode($params_obj),'add_contact');
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

                        $params_obj     = [
                            "contact_name"  => $contact_name,
                            "contact_id"    => $contact_id,
                            "column_name"   => $column_title,
                            "old_value"     => $old_value,
                            "new_value"     => $new_value,
                            "performed_by"  => loggedUserData()['name'],
                            "performed_by_id"=> loggedUserData()['user_id']
                        ];
                        $this->addActivities('contacts',$contact_id,json_encode($params_obj),'update_contact');
                    }
                } 

                /**
                 * Set reminder based on column change
                 */
                $reminder_columns = ['dtNextActionDate'];

                if(in_array($db_name,$reminder_columns)){
                    $required_data = [
                        'contacts_url'  => $linked_url,
                        'contacts_name' => $contact_name,
                        'column_data'   => $new_value,
                        'attendees'     => explode(',',$alerts_to)
                    ];

                    $this->setColumnBasedReminder($request,$required_data);
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
                    $contact_db_inert_id = DB::table('contacts')->insertGetId([
                        'iAddedById'        => loggedUserData()['user_id'],
                        'iUpdatedById'      => loggedUserData()['user_id'],
                        'dtAddedDate'       => date('Y-m-d H:i:s'),
                        'dtUpdatedDate'     => date('Y-m-d H:i:s')
                    ]);

                    if($contact_db_inert_id){
                        $db_inert_id = DB::table('contact_interaction')->insertGetId([
                            'vLinkedURL'    => ($linked_url != '')?$linked_url:'',
                            'iContactId'    => ($contact_db_inert_id != '')?$contact_db_inert_id:'',
                            $db_name        => $new_value,
                            'elogBy'        => 'Manual',
                            'iAddedById'    => loggedUserData()['user_id'],
                            'iUpdatedById'  => loggedUserData()['user_id'],
                            'dtAddedDate'   => date('Y-m-d H:i:s'),
                            'dtUpdatedDate' => date('Y-m-d H:i:s')
                        ]);

                        if($db_inert_id){
                            $return_arr = ['success' => 1,'insert_id'=>$db_inert_id,'db_table'=>'contact_interaction'];
                            
                            $params_obj     = [
                                "contact_name"  => $contact_name,
                                "contact_id"    => $contact_db_inert_id,
                                "column_name"   => $column_title,
                                "value"         => $new_value,
                                "performed_by"  => loggedUserData()['name'],
                                "performed_by_id"=> loggedUserData()['user_id']
                            ];
                            
                            $this->addActivities('contacts',$contact_db_inert_id,json_encode($params_obj),'add_contact_interaction');
                        }
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
                        
                        $params_obj     = [
                            "contact_name"  => $contact_name,
                            "contact_id"    => $contact_id,
                            "column_name"   => $column_title,
                            "old_value"     => $old_value,
                            "new_value"     => $new_value,
                            "performed_by"  => loggedUserData()['name'],
                            "performed_by_id"=> loggedUserData()['user_id']
                        ];
                        $this->addActivities('contacts',$contact_id,json_encode($params_obj),'update_contact_interaction');
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

        return $return_arr;
    } 

    public function set_remainder(Request $request,$input_params = []){
        $request_data   = !empty($input_params)?$input_params:$request->all();
        $notes          = $request_data['notes'];
        $request_data['remainder_date_time'] = date("Y-m-d H:i:s",strtotime(str_replace('/', '-',$request_data['remainder_date_time'])));
        
        if(session()->get('login_through') == 'google'){
            $reminder_response = $this->createGoogleReminder($request_data);
        }else{
            $reminder_response = $this->createRemainder($request_data);
        }
        $return_flag = 0;
        if(!empty($reminder_response)){
            $return_flag = 1;
            DB::table('set_reminder')->insert([
                'dtRemainderDateTime'   => $request_data['remainder_date_time'],
                'tNotes'                => $notes,
                'dtAddedDate'           => date('Y-m-d H:i:s'),
                'dtUpdatedDate'         => date('Y-m-d H:i:s'),
                'vContactsLinkedURL'    => ($request_data['contacts'] != '')?$request_data['contacts']:'',
                'tAttendees'            => ($reminder_response['attendees_email'] != '')?json_encode($reminder_response['attendees_email']):'',
                'tCalUid'               => $reminder_response['cal_uid'],
                'vOutlookId'            => $reminder_response['outlook_id'],
                'tSubject'              => $reminder_response['subject'],
                'iAddedById'            => loggedUserData()['user_id'],
                'iUpdatedById'          => loggedUserData()['user_id'],
                'eProvider'             => (session()->get('login_through') == 'google')?'Google':'Outlook'
            ]);
        }
        echo json_encode(['success'=>$return_flag]);exit;
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

        if(!empty($input_params['attendees'])){
            foreach($input_params['attendees'] as $val){
                if(!isset($val) || $val == ''){
                    continue;
                }

                $newEvent['attendees'][] = [
                    "emailAddress"=> [
                        "address"   => $val,
                        "name"      => $val
                    ],
                    "type"=> "required"
                ];
            }
        }

        // POST /me/events
        $graph              = $this->getGraph();
        $resultCreateEvent  = $graph->createRequest('POST', '/me/events')
        ->attachBody($newEvent)
        ->setReturnType(Model\Event::class)
        ->execute();         
        
        $attendees_arr      = $resultCreateEvent->getAttendees();

        $attendees_email    = [];
        if(!empty($attendees_arr)){            
            $attendees_email= array_column($attendees_arr,'emailAddress');
        }

        return [
            'cal_uid'           => $resultCreateEvent->getiCalUId(),
            'outlook_id'        => $resultCreateEvent->getId(),
            'subject'           => $reminder_subject,
            'attendees_email'   => $attendees_email
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
    
    public function createGoogleReminder($input_params = []){      
        
        $remainder_date_time = date('Y-m-d', strtotime($input_params['remainder_date_time'])).'T'.date('H:i:s', strtotime($input_params['remainder_date_time'])).'.0000000'; 
        $reminder_summary    = "Linked CRM Personal Reminder"; 
        if($input_params['contacts_name'] != ''){
            $reminder_summary= "Linked CRM Personal Reminder for ". $input_params['contacts_name'];
        }

        $event_data = [ 
            'summary'       => $reminder_summary,
            'location'      => 'Personal Reminder',
            'description'   => $input_params['notes'],
            'start'         => array(
                'dateTime' => $remainder_date_time,
                'timeZone' => session()->get('userTimeZone'),
            ),
            'end' => array(
                'dateTime' => $remainder_date_time,
                'timeZone' => session()->get('userTimeZone'),
            ),
            // 'recurrence' => array(
            //   'RRULE:FREQ=DAILY;COUNT=2'
            // ),
            'reminders' => array(
                'useDefault' => FALSE,
                'overrides' => array(
                    array('method' => 'email', 'minutes' => 15),
                    array('method' => 'popup', 'minutes' => 15),
              ),
            ),
        ];

        if(!empty($input_params['attendees'])){
            foreach($input_params['attendees'] as $val){
                if(!isset($val) || $val == ''){
                    continue;
                }

                $event_data['attendees'][] = [
                    "email"         => $val,    
                    "displayName"   => $val,
                    "optional"      => true
                ];
            }
        }
        
        // Get the access token from the cache
        $tokenCache     = new TokenCache();
        $accessToken    = $tokenCache->getAccessToken();

        // Get the API client and construct the service object.
        $client         = new Google\Client(config("constants.google"));
        if(!empty($accessToken)){
            $client->setAccessToken($accessToken);
        }
        
        $service        = new \Google\Service\Calendar($client);
        $event          = new Google\Service\Calendar\Event($event_data);
        $event_response = $service->events->insert('primary', $event);
        
        $attendees_arr  = $event_response->getAttendees();
        $attendees_email= [];
        if(!empty($attendees_arr)){            
            $attendees_email = array_map(function($ae) {
                return is_object($ae) ? $ae->email : $ae['email'];
            }, $attendees_arr);
        }

        return [
            'cal_uid'           => $event_response->getiCalUId(),
            'outlook_id'        => $event_response->getId(),
            'subject'           => $reminder_summary,
            'attendees_email'   => $attendees_email
        ];
    }

    public function fetch_reminder_count(){
        
        $query_response = DB::table('set_reminder')
        ->selectRaw("sum(if(vContactsLinkedURL!= '',1,0)) as contact_reminder,sum(if(vContactsLinkedURL= '',1,0)) as date_reminder,count(*) as total_count")
        ->where(DB::raw("DATE_FORMAT(dtRemainderDateTime,'%Y-%m-%d %H:%i')"), '>=',date('Y-m-d H:i'))
        ->where('iAddedById',loggedUserData()['user_id'])
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
        // ->where(DB::raw("DATE_FORMAT(dtRemainderDateTime,'%Y-%m-%d %H:%i')"), '>=',date('Y-m-d H:i'))
        ->where('iAddedById',loggedUserData()['user_id'])
        // ->limit(10)
        ->orderBy('dtRemainderDateTime', 'DESC')
        ->get();
        
        $query_response = json_decode(json_encode($query_obj_data), true);

        $tmp_query_resp = [];
        if(is_array($query_response) && count($query_response) > 0){
            foreach($query_response as $key => $val){
                $val['tAttendees'] = json_decode($val['tAttendees'],true);
                $tmp_query_resp[$val['reminder_date']][] = $val;
            }
        }

        return view('pages.contact.reminder_list',['data'=> $tmp_query_resp]);
    }

    public function addActivities($activity_type = '',$for_id = '',$params = '',$activity_code = ''){
        DB::table('activities')->insertGetId([
            'vActivitiesCode'       => $activity_code,
            'eActivityType'         => $activity_type,
            'iActivitiesForId'      => $for_id,
            'tParams'               => $params,
            'iAddedById'            => loggedUserData()['user_id'],
            'iUpdatedById'          => loggedUserData()['user_id'],
            'dtAddedDate'           => date('Y-m-d H:i:s'),
            'dtUpdatedDate'         => date('Y-m-d H:i:s'),
            'dtPerformedDate'       => date('Y-m-d H:i:s')
        ]);
    }

    public function export_data(Request $request){
        $unselected_column = $request->all()['unselected_column'];

        if(isset($unselected_column) && $unselected_column != ''){
            $unselected_column  = explode(',',base64_decode($unselected_column)); 
        }

        $select_columns = ['c.vStatus','date_format(c.dtStatusDate,"%d/%m/%Y") as dtStatusDate','date_format(c.dtLastConversationDate,"%d/%m/%Y") as dtLastConversationDate','c.tDiscussionPoints','c.vNextSteps','date_format(c.dtNextActionDate,"%d/%m/%Y") as dtNextActionDate','c.vContactName','c.vRelationshipStatus','c.vDesignation','c.vReportingManager','c.vOrganizationName','c.vWebsite','c.vPreviousRelationShip','c.vIndustry','c.vCityName','c.vStateName','c.vCountryName','c.vLinkedURL','c.vEmail','c.vReachoutCategory','c.vWorkNumber','c.vMobileNumber','c.vCategory','c.vTouchPoints','c.vAdaptability','c.vDispositionTowards','c.vCoverage','c.tResponse','ci.tMessage','ci.vMessageBy','ci.vConnectionStatus','ci.vMessageStatus','date_format(ci.dMessageDate,"%d/%m/%Y") as dMessageDate','ci.dMessageTime','c.vHometownState','c.vAlertsTo'];

        $query_obj_data = DB::table('contacts as c')
            ->leftJoin('contact_interaction as ci', function($join) {
                $join->on('ci.vLinkedURL', '=', 'c.vLinkedURL');
                $join->orOn('ci.iContactId', '=','c.iContactsId');
            })
            ->whereIn('c.iContactsId',explode(',',$request->all()['row_ids']))
            ->orderBy('c.iContactsId', 'ASC')
            ->get(DB::raw(implode(',',$select_columns)));
        
            $query_response = array_map(function($item) {
            return (array)$item; 
        }, $query_obj_data->toArray());
        
        $default_columns    = $this->defaultColumns();
        $hidden_column_id   = array_keys(array_column($default_columns, 'hide_column'), 'true');
        
        $hidden_columns_title = []; 
        foreach($hidden_column_id as $hc_val){
            $unselected_column[]   = $default_columns[$hc_val]['db_name'];    
        }
        
        $column_titles = $column_data_key = [];

        foreach($default_columns as $dc_val){
            if(!in_array($dc_val['db_name'],$unselected_column)){
                $column_titles[]      = $dc_val['title'];
                $column_data_key[]    = $dc_val['db_name'];
            }
        }

        $filename           = storage_path()."/contact_list.csv";
        $output             = fopen($filename, 'w+');
        
        fputcsv($output, $column_titles);

        foreach ($query_response as $line) {
            $temp_arr = [];
            foreach($column_data_key as $val){
                // if(!in_array($val,$hidden_columns_db_name)){                    
                    $temp_arr[] = !empty($line[$val])?$line[$val]:'N/A';
                //}
            }
            
            if(!empty($temp_arr) && count($temp_arr) > 0){
                fputcsv($output, $temp_arr);
            }
        }

        if (file_exists($filename)) {
            return response()->download($filename)->deleteFileAfterSend(true);
        }else{
            echo "<div>Error occurred while exporting contacts</div>";exit;
        }
    }

    public function setColumnBasedReminder($request,$input_params = []){
        if(!is_array($input_params) || empty($input_params)){
            return false;
        }

        $required_data = [
            'notes'                 => "Linked CRM Personal Reminder",
            'remainder_date_time'   => $input_params['column_data'],
            'contacts_url'          => $input_params['contacts_url'],
            'contacts'              => $input_params['contacts_url'],
            'contacts_name'         => $input_params['contacts_name'],
            'attendees'             => $input_params['attendees']
        ];
        
        $this->set_remainder($request,$required_data);
        return true;
    }

    public function defaultColumns($column_enum = ''){
        
        $column_json = Storage::disk('public')->get('contact_column.json');
        if(empty($column_json)){
            $column_json = [];
        }else{
            $column_json = json_decode($column_json,true);
        }

        usort($column_json, function($a, $b) {
            return $a['sequence'] <=> $b['sequence'];
        });

        return $column_json;
    }

    public function logFilterData($input_params = []){
        // if(empty($input_params['global_filter']) && empty($input_params['custom_filter'])){
        //     return true;
        // }

        $update_data = [
            'custom_filter' => (!empty($input_params['custom_filter']))?$input_params['custom_filter']:[],
            'global_filter' => (!empty($input_params['global_filter']))?$input_params['global_filter']:[],
        ];

        if(isset(loggedUserData()['user_id']) && loggedUserData()['user_id'] != ''){
            DB::table('user')
            ->where('iUserId', loggedUserData()['user_id'])  
            ->update(array(
                'tConfiguration'=> json_encode($update_data),
                'iUpdatedById'  => loggedUserData()['user_id'],
                'dtUpdatedDate' => date('Y-m-d H:i:s')
            ));
        }
        return true;
    }

    public function getFilterLogData(){
        $user_data  = getUserData(loggedUserData()['user_id']);
        $log_data   = [];
        if(!empty($user_data['tConfiguration'])){
            $log_data = json_decode($user_data['tConfiguration'],true);
        }
        return $log_data;
    }

    public function update_column_sequence(Request $request){
        $request_data       = $request->all();
        $column_seq         = isset($request_data['column_sequence'])?explode(',',$request_data['column_sequence']):[];
        
        $column_json_decode = [];
        $return_flag        = false;
        
        if(!empty($column_seq)){
            $column_json = Storage::disk('public')->get('contact_column.json');
            
            if(!empty($column_json)){
                $column_json_decode = json_decode($column_json,true);
                $column_json_decode = array_column($column_json_decode,null,'title');
                
                if(!empty($column_json_decode)){
                    foreach($column_seq as $cs_key => $cs_val){
                        if(!empty($column_json_decode[$cs_val])){
                            $column_json_decode[$cs_val]['sequence'] = ($cs_key+1); 
                        }
                    }
                    $column_json_decode = array_values($column_json_decode);

                    usort($column_json_decode, function($a, $b) {
                        return $a['sequence'] <=> $b['sequence'];
                    });
                    
                    $return_flag    = true;
                    
                    Storage::disk('public')->put('contact_column.json', json_encode($column_json_decode));
                }
            }
        }
        echo json_encode(['success' => $return_flag,'column_array' => $column_json_decode]);exit;
    }
}