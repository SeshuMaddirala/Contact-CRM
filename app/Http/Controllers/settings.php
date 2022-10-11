<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class settings extends Controller
{
    public function column_list(){
        $column_data = $this->getColumnData();
        return view('pages.settings.column_list',['column_data' => $column_data]); 
    }

    public function add_update_column(Request $request){
        $request_data   = $request->all();
        $column_data    = [];
        foreach($request_data['column_data'] as $key => $val){
            $db_table = 'contacts';
            if(in_array($val['db_alias_name'],['vConnectionStatus','vMessageStatus','tMessage','dMessageTime','dMessageDate','vMessageBy'])){
                $db_table = 'contact_interaction';
            }

            $column_data[] = [
                'title'         => $val['display_name'],
                'type'          => $val['type'],
                'name'          =>  str_replace(' ', '_', strtolower($val['display_name'])),
                // 'data'          => 'contact_name',
                'db_name'       => $val['db_alias_name'],
                'db_table'      => $db_table,
                'source_data'   => ($val['data_source'] != '')?array_map('trim',explode(',',$val['data_source'])):[],
                'sequence'      => ($val['sequence'] != '')?$val['sequence']:($key+1),
                'hide_column'   => $val['hide_column'],
                'validate'      => $val['validate'],
            ];
        }

        Storage::disk('public')->put('contact_column.json', json_encode($column_data));

        echo json_encode(['success' => 1]);exit;
    }

    public function getColumnData(){
        $column_json = Storage::disk('public')->get('contact_column.json');
        if(empty($column_json)){
            $column_json = [];
        }else{
            $column_json = json_decode($column_json,true);
        }
        return $column_json;
    }
}
