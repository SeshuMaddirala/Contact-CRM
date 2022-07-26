<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Leads;
use App\Http\Controllers\Contact;
use App\Http\Controllers\Login;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('',[Login::class, 'index']);

Route::get('contact',[Contact::class, 'index']);

Route::get('get_contact',[Contact::class, 'get']);

Route::post('update_data',[Contact::class, 'update_data']);

Route::get('login',[Login::class, 'index']);

