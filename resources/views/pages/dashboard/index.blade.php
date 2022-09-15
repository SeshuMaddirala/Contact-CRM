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
                     @foreach($dashboard_data['unread_response'] as $key => $val)
                        <tr>
                           <td>{{$key+1}}</td>
                           <td>
                              <div class="d-flex align-items-center">
                                 <span>{{$val['profile_name']}}</span>
                              </div>
                           <td colspan="3" class="txt-align-center">
                              No records found
                           </td>
                           <td>{{$val['unread_count']}}</td>
                        </tr>
                     @endforeach
                  @endif
               </tbody>
            </table>
         </div>
      </div>
   </div>
   
   <div class="col-md-6 col-lg-6 order-2 mb-4">
      <div class="card">
            <div class="card-body pb-0">
               <span class="d-block fw-semibold mb-1 card-title">Unregistered Contacts (BOT) </span>
               <hr style="margin-top: 11px;margin-bottom: 11px;border: 0;border-top: 1px solid #dbd1d1;">
            </div>
            <div class="card-body">
               <table class="table table-borderless text-nowrap">
                  <thead>
                     <tr>
                        <th>LinkedIn</th>
                        <th>ConnectionStatus</th>
                     </tr>
                  </thead>
                  <tbody>
                     @foreach($dashboard_data['unregistered_response'] as $key => $val)
                        <tr>
                           <td>
                              <div class="d-flex align-items-center">
                                 <span>{{$val['unregistered_LinkedURL']}}</span>
                              </div>
                           </td>
                           <td>{{$val['unregistered_ConnectionStatus']}}</td>
                        </tr>
                     @endforeach
                  </tbody>
               </table>
            </div>
         </div>
     
   </div>
</div>
@stop