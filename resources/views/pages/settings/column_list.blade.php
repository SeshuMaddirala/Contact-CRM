@extends('layouts.default')
@section('page_title')
   Columns List
@stop
@section('content')
<div class="panel panel-default">
   <div class="panel-heading">
      Columns List
      <button type="button" class="btn btn-primary btn-modal add-column-btn"><i class="fa-solid fa-plus"></i> Add Column</button>
   </div>

   <div class="panel-body">
      <div class="column-list-div">
         <table class="table table-striped">
            <thead>
               <tr>
                  <th>S.no</th>
                  <th>Display Name</th>
                  <th>Type</th>
                  <th>DB alias name</th>
                  <th>Sequence</th>
                  <th>Hide Column</th>
                  <th>Validate</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>               
               @if(!empty($column_data))
                  @foreach($column_data as $key => $val)
                     <tr>
                        <td>{{$key+1}}</td>
                        <td>
                           <input type="text" class="form-control display_name" value="{{$val['title']}}" placeholder="Please enter display name">
                        </td>
                        <td>
                           <select class="form-control type" placeholder="Please select type">
                              <option value="" disabled selected>Please select type</option>
                              <option value="text" @if($val['type'] == 'text') selected @endif >Text</option>
                              <option value="dropdown" @if($val['type'] == 'dropdown') selected @endif>Dropdown</option>
                              <option value="numeric" @if($val['type'] == 'numeric') selected @endif>Numeric</option>
                              <option value="date" @if($val['type'] == 'date') selected @endif>Date</option>
                              <option value="time" @if($val['type'] == 'time') selected @endif>Time</option>
                           </select>
                           <input type="text" class="form-control data_source @if($val['type'] != 'dropdown') hide @endif" placeholder="value must be in comma separated" @if(!empty($val['source_data'])) hide  value="{{ implode(', ', $val['source_data']) }} @endif">
                        </td>
                        <td>
                           <input type="text" class="form-control db_alias_name" value="{{$val['db_name']}}" placeholder="Please enter DB alias name"></td>
                        <td>
                           <input type="number" class="form-control sequence" value="{{$val['sequence']}}" placeholder="Please enter sequence"></td>
                        <td>
                           <input type="checkbox" class="form-control hide_column" data-on="Yes" data-off="No" data-toggle="toggle" data-style="ios" @if($val['hide_column'] == 'true') checked @else unchecked @endif >
                        </td>
                        <td>
                           <input type="checkbox" class="form-control validate" data-on="Yes" data-off="No" data-toggle="toggle" data-style="ios" @if($val['validate'] == 'true') checked @else unchecked @endif>
                        </td>
                        <td>
                           <i class="fa-solid fa-trash-can"></i>
                        </td>
                     </tr>
                  @endforeach
               @else
               <tr>
                  <td>{{$key+1}}</td>
                  <td>
                     <input type="text" class="form-control display_name" placeholder="Please enter display name">
                  </td>
                  <td>
                     <select class="form-control type" placeholder="Please select type">
                        <option value="" disabled selected>Please select type</option>
                        <option value="text">Text</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="numeric">Numeric</option>
                        <option value="date">Date</option>
                        <option value="time">Time</option>
                     </select>
                  </td>
                  <td>
                     <input type="text" class="form-control db_alias_name" placeholder="Please enter DB alias name"></td>
                  <td>
                     <input type="number" class="form-control sequence" placeholder="Please enter sequence"></td>
                  <td>
                     <input type="checkbox" class="form-control hide_column" data-on="Yes" data-off="No" data-toggle="toggle" data-style="ios" unchecked>
                  </td>
                  <td>
                     <input type="checkbox" class="form-control validate" data-on="Yes" data-off="No" data-toggle="toggle" data-style="ios" unchecked>
                  </td>
                  <td>
                     <i class="fa-solid fa-trash-can"></i></td>
               </tr>    
               <tr class="data-source-div @if($val['type'] != 'dropdown') hide @endif ">
                  <td></td>
                  <td></td>
                  <td colspan="6">
                     <input type="text" class="form-control data_source" placeholder="Please enter data source value must be in comma separated">
                  </td>
               </tr>   
               @endif
            </tbody>
         </table>
         <!-- @if(!empty($column_data))
            @foreach($column_data as $key => $val)
            <div class="form-row" >
               <div class="form-group col-md-3">
                  <label for="display_name">Display Name</label>
                  <input type="text" class="form-control display_name" value="{{$val['title']}}" placeholder="Please enter display name">
               </div>
               <div class="form-group col-md-2">
                  <label for="type">Type</label>
                  <select class="form-control type" placeholder="Please select type">
                     <option value="" disabled selected>Please select type</option>
                     <option value="text" @if($val['type'] == 'text') selected @endif >Text</option>
                     <option value="dropdown" @if($val['type'] == 'dropdown') selected @endif>Dropdown</option>
                     <option value="numeric" @if($val['type'] == 'numeric') selected @endif>Numeric</option>
                     <option value="date" @if($val['type'] == 'date') selected @endif>Date</option>
                     <option value="time" @if($val['type'] == 'time') selected @endif>Time</option>
                  </select>
               </div>
               <div class="form-group col-md-2">
                  <label for="db_alias_name">DB alias name</label>
                  <input type="text" class="form-control db_alias_name" value="{{$val['db_name']}}" placeholder="Please enter DB alias name">
               </div>
               <div class="form-group col-md-2">
                  <label for="sequence">Sequence</label>
                  <input type="number" class="form-control sequence" value="{{$val['sequence']}}" placeholder="Please enter sequence">
               </div>
               <div class="form-group col-md-1">
                  <label for="hide_column">Hide Column</label>
                  <input type="checkbox" class="form-control hide_column" data-on="Yes" data-off="No" data-toggle="toggle" data-style="ios" @if($val['hide_column'] == 'true') checked @else unchecked @endif >
               </div>
               <div class="form-group col-md-1">
                  <label for="validate">Validate</label>
                  <input type="checkbox" class="form-control validate" data-on="Yes" data-off="No" data-toggle="toggle" data-style="ios" @if($val['validate'] == 'true') checked @else unchecked @endif>
               </div>
               <div class="form-group col-md-1">
                  <label for="validate">Action</label>
                  <i class="fa-solid fa-trash-can form-control"></i>
               </div>
               
               <div class="form-group row col-md-12 data-source-div @if($val['type'] != 'dropdown') hide @endif ">
                  <label for="data_source" class="col-sm-1 col-form-label">Data Source</label>    
                  <div class="col-sm-6">
                     <input type="text" class="form-control data_source" placeholder="Please enter data source"  aria-describedby="data_source_help_block">
                     <small id="data_source_help_block" class="form-text text-muted">
                        Data source value must be in comma separated
                     </small>
                  </div>
               </div>
            </div>
            @endforeach
         @else
         <div class="form-row" >
               <div class="form-group col-md-3">
                  <label for="display_name">Display Name</label>
                  <input type="text" class="form-control display_name" placeholder="Please enter display name">
               </div>
               <div class="form-group col-md-2">
                  <label for="type">Type</label>
                  <select class="form-control type" placeholder="Please select type">
                     <option value="" disabled selected>Please select type</option>
                     <option value="text">Text</option>
                     <option value="dropdown">Dropdown</option>
                     <option value="numeric">Numeric</option>
                     <option value="date">Date</option>
                     <option value="time">Time</option>
                  </select>
               </div>
               <div class="form-group col-md-2">
                  <label for="db_alias_name">DB alias name</label>
                  <input type="text" class="form-control db_alias_name" placeholder="Please enter DB alias name">
               </div>
               <div class="form-group col-md-2">
                  <label for="sequence">Sequence</label>
                  <input type="number" class="form-control sequence" placeholder="Please enter sequence">
               </div>
               <div class="form-group col-md-1">
                  <label for="hide_column">Hide Column</label>
                  <input type="checkbox" class="form-control hide_column" data-on="Yes" data-off="No" data-toggle="toggle" data-style="ios" unchecked>
               </div>
               <div class="form-group col-md-1">
                  <label for="validate">Validate</label>
                  <input type="checkbox" class="form-control validate" data-on="Yes" data-off="No" data-toggle="toggle" data-style="ios" unchecked>
               </div>
               <div class="form-group col-md-1">
                  <label for="validate">Action</label>
                  <i class="fa-solid fa-trash-can form-control"></i>
               </div>
               
               <div class="form-group row col-md-12 hide data-source-div">
                  <label for="data_source" class="col-sm-1 col-form-label">Data Source</label>    
                  <div class="col-sm-6">
                     <input type="text" class="form-control data_source" placeholder="Please enter data source"  aria-describedby="data_source_help_block">
                     <small id="data_source_help_block" class="form-text text-muted">
                        Data source value must be in comma separated
                     </small>
                  </div>
               </div>
            </div>
         @endif -->
      </div>
      <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary save-column-list">Save changes</button>
      </div>
   </div>
</div>
@stop

@section('scripts')
<script src="{{ asset('js/column-list.js') }}"></script>
<link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
@stop