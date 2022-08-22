@extends('layouts.default')
@section('page_title')
   Contact List
@stop

@section('content')
   <div class="panel panel-default">
      <div class="panel-heading">
         Contact's List
         <button type="button" class="btn btn-primary remainderModal" data-toggle="modal" data-target="#remainderModal">Remainder</button>
         <!-- <button type="button" class="btn btn-primary filter-icon"><i class="fa fa-filter"></i></button> -->
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
                  <strong>Create Remainder</strong>
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
                     <label for="remainder_date_time" class="col-form-label">Date&Time</label>
                     <input type="text" class="form-control" id="remainder_date_time">
                  </div>
                  <div class="form-group">
                     <label for="message-text" class="col-form-label">Notes</label>
                     <textarea class="form-control" id="message-text"></textarea>
                  </div>
               </form>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-primary save-remainder">Save changes</button>
            </div>
         </div>
      </div>
   </div>
@stop

@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/handsontable@latest/dist/handsontable.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
<script src="{{ asset('js/contact-form-new.js') }}"></script>
<link href="https://cdn.jsdelivr.net/npm/handsontable@latest/dist/handsontable.full.min.css" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.css" />
@stop

<script>
   var column_pre_data = @json($enum_values);
</script>