@extends('layouts.default')
@section('page_title')
   Contact List
@stop

@section('default_column')
   $default_column   
@stop

@section('content')
   <div class="panel panel-default">
      <div class="panel-heading">
         Contact's List
         <button type="button" class="btn btn-primary remainderModal" data-toggle="modal" data-target="#remainderModal">Reminder</button>
         <!-- <button type="button" class="btn btn-primary filter-icon"><i class="fa fa-filter"></i></button> -->
         <button type="button" class="btn btn-primary filterModal btn-modal" data-toggle="modal" data-target="#filterModal">Filter</button>
         <button type="button" class="btn btn-primary btn-modal export-btn"><i class="fa-solid fa-download"></i> Export</button>
         <div class="float-right contact-datefilter-div">
            <i class="fa-solid fa-calendar-days"></i>
            <input type="text" name="contact-datefilter" id="contact-datefilter" value=""  />
         </div>
      </div>
      <div class="panel-body">
         <div class="table-responsive">
            <div id="dataTable" class="custom-scroll"></div>
         </div>
      </div>
   </div>

   <div class="modal fade" id="remainderModal" tabindex="-1" role="dialog" aria-labelledby="remainderModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="remainderModalLabel">
                  <strong>Create Reminder</strong>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </h5>
            </div>
            <div class="modal-body">
               <form name="remainder_form" id="remainder_form" method="post" enctype="multipart/form-data" autocomplete="off" >
                  <div class="form-group">
                     <label for="contacts" class="col-form-label">LinkedIn Contact</label>
                     <input type="hidden" class="form-control" id="contacts">
                     <input type="hidden" class="form-control" id="contacts_name">
                  </div>
                  <div class="form-group">
                     <label for="attendees" class="col-form-label">Attendees</label><nbsp>*</nbsp>
                     <select class="form-control" name="attendees" id="attendees" placeholder="Please search attendees">
                     </select>
                  </div>
                  <div class="form-group">
                     <label for="remainder_date_time" class="col-form-label">Date&Time</label><nbsp>*</nbsp>
                     <input type="text" class="form-control" name="remainderdatetime" id="remainder_date_time" placeholder="Please select date&time">
                     <!-- <div class="contact-datefilter-div">
                        <i class="fa-solid fa-calendar-days"></i>
                        <input type="text" class="form-control" id="remainder_date_time" placeholder="Please select date&time">
                     </div> -->
                  </div>
                  <div class="form-group">
                     <label for="message-text" class="col-form-label">Notes</label><nbsp>*</nbsp>
                     <textarea class="form-control" name="messagetext" id="message-text" placeholder="Please enter notes"></textarea>
                  </div>
               </form>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-primary save-remainder">Save changes</button>
               <!-- <button type="button" class="btn btn-primary clear-remainder">clear</button> -->
            </div>
         </div>
      </div>
   </div>

   @include('includes.filter')
@stop

@section('scripts')
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script> -->

<script src="{{ asset('js/handsontable.full.min.js') }}"></script>
<script src="{{ asset('js/jquery.datetimepicker.full.min.js') }}"></script>
<script src="{{ asset('js/daterangepicker.min.js') }}" ></script>
<script src="{{ asset('js/select2.full.min.js') }}"></script>
<script src="{{ asset('js/chosen.jquery.min.js') }}"></script>
<script src="{{ asset('js/contact-form-new.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/handsontable.full.min.css') }}"/>
<link rel="stylesheet" href="{{ asset('css/jquery.datetimepicker.css') }}" />
<link rel="stylesheet" href="{{ asset('css/chosen.min.css') }}"/>
<!-- https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen-sprite.png -->
<link rel="stylesheet" href="{{ asset('css/daterangepicker.min.css') }}" />
<link rel="stylesheet" href="{{ asset('css/select2.min.css') }}"/>

<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
@stop

<script>
   var column_pre_data = @json($enum_values);
   var column_property = @json($default_column);
</script>