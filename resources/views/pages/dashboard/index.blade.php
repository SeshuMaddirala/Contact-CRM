@extends('layouts.default')
@section('page_title')
   Dashboard
@stop

@section('content')
<div class="row">
   <div class="col-md-6 col-lg-4 order-2 mb-4">
      <div class="card h-100">
         <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="card-title m-0 me-2">Profile Unread Count</h5>
            <!-- <div class="dropdown">
               <button class="btn p-0" type="button" id="transactionID" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <i class="bx bx-dots-vertical-rounded"></i>
               </button>
               <div class="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
               <a class="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
               <a class="dropdown-item" href="javascript:void(0);">Last Month</a>
               <a class="dropdown-item" href="javascript:void(0);">Last Year</a>
               </div>
            </div> -->
         </div>
         <div class="card-body">
            <table class="table table-borderless text-nowrap">
               <thead>
                  <tr>
                     <th>No</th>
                     <th>Profile</th>
                     <th>Count</th>
                  </tr>
               </thead>
               <tbody>
                  @if(!empty($dashboard_data['unread_response']))
                     @foreach($dashboard_data['unread_response'] as $key => $val)
                        <tr>
                           <td>{{$key+1}}</td>
                           <td>
                              <div class="d-flex align-items-center">
                                 <span>{{$val['profile_name']}}</span>
                              </div>
                           </td>
                           <td>{{$val['unread_count']}}</td>
                        </tr>
                     @endforeach
                  @else
                     <tr>
                        <td colspan="3" class="txt-align-center">
                           No records found
                        </td>
                     </tr>
                  @endif
               </tbody>
            </table>
         </div>
      </div>
   </div>
   
   <div class="col-lg-2 col-md-12 col-2 mb-2">
      <div class="card">
         <div class="card-body pb-0">
            <span class="d-block fw-semibold mb-1 card-title">Unregistered Contacts (BOT) </span>
            <hr style="margin-top: 11px;margin-bottom: 11px;border: 0;border-top: 1px solid #dbd1d1;">
            <h3 class="mb-1 txt-align-center">{{$dashboard_data['unregistered_count']}}</h3>
         </div>
      </div>
   </div>
</div>
@stop