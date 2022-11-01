@extends('layouts.default')
@section('page_title')
   Activities
@stop

@section('content')<div class="container">
    <div class="row">
         <div class="col-md-12">
            <div class="float-right contact-datefilter">
               <input type="text" name="datefilter" value="" autocomplete="off" />
            </div>
         </div>
         <div class="col-md-12">
            <div class="main-timeline">
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
