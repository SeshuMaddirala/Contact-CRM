<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Leads;
use App\Http\Controllers\Contact;
use App\Http\Controllers\Login;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\ActivitiesController;
use App\Http\Controllers\settings;

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

// Auth::routes();

// Route::get('',[Login::class, 'login'])->name('login');

Route::get('',[Login::class, 'login_sso_action'])->name('login_sso_action');

Route::get('login_sso_action',[Login::class, 'login_sso_action'])->name('login_sso_action');

Route::get('get_user',[Login::class, 'get_user'])->name('get_user');

Route::get('attempt_login',[Login::class, 'attempt_login'])->middleware('auth');

Route::get('index',[Dashboard::class, 'index'])->name('index')->middleware('auth');

Route::get('contact',[Contact::class, 'index'])->name('contact')->middleware('auth');

Route::get('get_contact',[Contact::class, 'get'])->name('get_contact')->middleware('auth');

Route::post('update_data',[Contact::class, 'update_data'])->name('update_data')->middleware('auth');

Route::post('set_remainder',[Contact::class, 'set_remainder'])->name('set_remainder')->middleware('auth');

Route::get('fetch_reminder_count',[Contact::class, 'fetch_reminder_count'])->name('fetch_reminder_count')->middleware('auth');

Route::get('reminder',[Contact::class, 'reminder'])->name('reminder')->middleware('auth');

Route::get('export_data',[Contact::class, 'export_data'])->name('export_data')->middleware('auth');

Route::get('settings',[Settings::class, 'index'])->name('settings')->middleware('auth');

Route::get('activities',[ActivitiesController::class, 'index'])->name('activities')->middleware('auth');

Route::get('fetch_activities',[ActivitiesController::class, 'fetch_activities'])->name('fetch_activities')->middleware('auth');