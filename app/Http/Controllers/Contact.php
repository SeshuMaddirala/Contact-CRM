<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;

class Contact extends BaseController
{
    public function index(){
        $enum_values = $this->getEnumValues();
        return view('pages.contact.contact_list',compact('enum_values'));        
    }

    public function get(){
        

        // $column = array("id", "first_name", "last_name", "gender");

        // $query = "SELECT * FROM tbl_sample ";

        // if(isset($_POST["search"]["value"]))
        // {
        //     $query .= '
        //     WHERE first_name LIKE "%'.$_POST["search"]["value"].'%" 
        //     OR last_name LIKE "%'.$_POST["search"]["value"].'%" 
        //     OR gender LIKE "%'.$_POST["search"]["value"].'%" 
        //     ';
        // }

        // if(isset($_POST["order"]))
        // {
        //     $query .= 'ORDER BY '.$column[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' ';
        // }
        // else
        // {
        //     $query .= 'ORDER BY id DESC ';
        // }

        // $query1 = '';

        // if($_POST["length"] != -1)
        // {
        //     $query1 = 'LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
        // }

        // $statement = $connect->prepare($query);

        // $statement->execute();

        // $number_filter_row = $statement->rowCount();

        // $result = $connect->query($query . $query1);

        // $data = array();

        // foreach($result as $row)
        // {
        //     $sub_array = array();
        //     $sub_array[] = $row['id'];
        //     $sub_array[] = $row['first_name'];
        //     $sub_array[] = $row['last_name'];
        //     $sub_array[] = $row['gender'];
        //     $data[] = $sub_array;
        // }

        // function count_all_data($connect)
        // {
        //     $query = "SELECT * FROM tbl_sample";

        //     $statement = $connect->prepare($query);

        //     $statement->execute();

        //     return $statement->rowCount();
        // }

        // $output = array(
        //     'draw'		=>	intval($_GET['draw']),
        //     'recordsTotal'	=>	count_all_data($connect),
        //     'recordsFiltered'	=>	$number_filter_row,
        //     'data'		=>	$data
        // );

        $data = [[
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
        ],[
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
            'dasda',
        ]];

        $output = array(
            'draw'		        =>	1,
            'recordsTotal'	    =>	1,
            'recordsFiltered'	=>	1,
            'data'		        =>	$data
        );



        echo json_encode($output);
    }

    public function update_data(){
        echo "<pre>";
        print_r($_POST);exit;
    }

    protected function getEnumValues(){
        $query_string   =  "SHOW COLUMNS FROM contacts WHERE Field IN ('eStatus','eRelationshipStatus','eReachoutCategory','eCategory','eAdaptability','eDispositionTowards','eCoverage')";
        $query_response = DB::select($query_string);

        $return_arr     = []; 

        if(is_array($query_response) && count($query_response) > 0){
            foreach($query_response as $val){
                preg_match("/^enum\(\'(.*)\'\)$/", $val->Type, $matches);
                $return_arr[$val->Field] = explode("','", $matches[1]);
            }
        }
        return $return_arr;
    } 
}
