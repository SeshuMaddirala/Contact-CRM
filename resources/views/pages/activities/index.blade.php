@extends('layouts.default')
@section('page_title')
   Activities
@stop

@section('content')

<div class="container">
    <!-- <h3>Activities</h3> -->
   <div class="row">
      <div class="col-md-12 col-lg-12">
         <div id="tracking-pre"></div>
         <div id="tracking">
            <div class="text-center tracking-status-intransit">
               <div class="float-right contact-datefilter-div">
                  <i class="fa-solid fa-calendar-days"></i>
                  <input type="text" name="datefilter" id="datefilter" value="" autocomplete="off"/>
               </div>
               <p class="tracking-status text-tight">Activities</p>
            </div>
            <div class="tracking-list">
            </div>
         </div>
      </div>
   </div>
</div>
@stop

@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.min.js" ></script>
<script src="{{ asset('js/activities.js') }}"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.min.css" />
<link rel="stylesheet" href="{{ asset('css/activities.css') }}"/>
@stop
