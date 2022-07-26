<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\View;

class Leads extends BaseController
{
    public function index(){
        return view('pages.listing');        
    }
}
