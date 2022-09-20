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
         <div class="card-body custom-scroll">
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
                        <td colspan="3" class="txt-align-center error">
                           No records found
                        </td>
                     </tr>
                  @endif
               </tbody>
            </table>
         </div>
      </div>
   </div>
   
   <div class="col-md-6 col-lg-4 order-2 mb-4">
      <div class="card h-100">
         <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="card-title m-0 me-2">Unregistered Contacts (BOT)</h5>
         </div>
         <div class="card-body custom-scroll">
            <table class="table table-borderless unregister-contct">
               <thead>
                  <tr>
                     <th>LinkedIn</th>
                     <th>ConnectionStatus</th>
                  </tr>
               </thead>
               <tbody>
                  @if(!empty($dashboard_data['unregistered_response']))
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
               @else
                  <tr>
                     <td colspan="3" class="txt-align-center error">
                        No records found
                     </td>
                  </tr>
               @endif
               </tbody>
            </table>
         </div>     
      </div>
   </div>
</div>
@stop