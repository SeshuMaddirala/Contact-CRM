<div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="filterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document" style="width: 750px;">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="filterModalLabel">
                <strong>Apply Filter Criteria</strong>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </h5>
        </div>
        <div class="modal-body">
            <div>
                <button class="btn btn-primary add_new_filter float-right">Add new</button>
            </div>
            
            <form name="remainder_form" id="remainder_form" method="post" enctype="multipart/form-data" autocomplete="off" >
                <table class="table table-striped filter-table">
                    @if(!empty($filter_data['custom_filter']))
                        @foreach($filter_data['custom_filter'] as $fd_key => $fd_val)
                            <tr data-row="{{$fd_key}}">
                                <td style="width: 30%">
                                    <div class="form-group">
                                        <select class="chosen-select filter-column form-control" data-placeholder="Please select column">
                                            @foreach($default_column as $key => $val)
                                                @if(!in_array($val['db_name'],['iContactInteractionId','iContactsId']))
                                                    <option value="{{$val['name']}}" data-table-name="{{$val['db_table']}}" data-type="{{$val['type']}}" data-dbcolumn-name="{{$val['db_name']}}"  @if($fd_val['filter_column'] == $val['db_name']) selected @endif >{{$val['title']}}</option>
                                                @endif
                                            @endforeach
                                        </select>
                                    </div>
                                </td>
                                <td style="width: 30%">
                                    <select class="chosen-select filter-type form-control" data-placeholder="Please select type">
                                        <option value="equal_to" @if($fd_val['filter_type'] == 'equal_to') selected @endif>Is equal to</option>
                                        <option value="not_equal_to" @if($fd_val['filter_type'] == 'not_equal_to') selected @endif>Is not equal to</option>
                                        <option value="begins_with" @if($fd_val['filter_type'] == 'begins_with') selected @endif>Begins with</option>
                                        <option value="ends_with" @if($fd_val['filter_type'] == 'ends_with') selected @endif>Ends with</option>
                                        <option value="contains" @if($fd_val['filter_type'] == 'contains') selected @endif>Contains</option>
                                        <option value="does_not_contains" @if($fd_val['filter_type'] == 'does_not_contains') selected @endif>Does not contains</option>
                                    </select>
                                </td>
                                <td style="width: 30%">
                                    <input type="text" class="filter_value form-control" />
                                    <!-- <input type="text" class="hide filter_value_date form-control" /> -->
                                    <select class="hide filter_value form-control" multiple></select>
                                </td>
                                <td  style="width: 5%">
                                    <i class="fa-solid fa-trash-can form-control filter-delete-row"></i>
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td style="width: 30%">
                                <div class="form-group">
                                    <select class="chosen-select filter-column form-control" data-placeholder="Please select column">
                                        @foreach($default_column as $key => $val)
                                            @if(!in_array($val['db_name'],['iContactInteractionId','iContactsId']))
                                                <option value="{{$val['name']}}" data-table-name="{{$val['db_table']}}" data-type="{{$val['type']}}" data-dbcolumn-name="{{$val['db_name']}}">{{$val['title']}}</option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                            </td>
                            <td style="width: 30%">
                                <select class="chosen-select filter-type form-control" data-placeholder="Please select type">
                                    <option value="equal_to">Is equal to</option>
                                    <option value="not_equal_to">Is not equal to</option>
                                    <option value="begins_with">Begins with</option>
                                    <option value="ends_with">Ends with</option>
                                    <option value="contains">Contains</option>
                                    <option value="does_not_contains">Does not contains</option>
                                </select>
                            </td>
                            <td style="width: 30%">
                                <input type="text" class="filter_value form-control" />
                                <!-- <input type="text" class="hide filter_value_date form-control" /> -->
                                <select class="hide filter_value form-control" multiple></select>
                            </td>
                            <td  style="width: 5%">
                                <i class="fa-solid fa-trash-can form-control filter-delete-row"></i>
                            </td>
                        </tr>
                    @endif
                
                    <tr class="hide">
                        <td  style="width: 30%">
                            <select class="filter-column form-control" data-placeholder="Please select column">
                                @foreach($default_column as $key => $val)
                                    @if(!in_array($val['db_name'],['iContactInteractionId','iContactsId']))
                                    <option value="{{$val['name']}}" data-table-name="{{$val['db_table']}}" data-type="{{$val['type']}}" data-dbcolumn-name="{{$val['db_name']}}">{{$val['title']}}</option>
                                    @endif
                                @endforeach
                            </select>
                        </td>
                        <td style="width: 30%">
                            <select class="filter-type form-control" data-placeholder="Please select type">
                                <option value="equal_to">Is equal to</option>
                                <option value="not_equal_to">Is not equal to</option>
                                <option value="begins_with">Begins with</option>
                                <option value="ends_with">Ends with</option>
                                <option value="contains">Contains</option>
                                <option value="does_not_contains">Does not contains</option>
                            </select>
                        </td>
                        <td style="width: 30%">
                            <input type="text" class="filter_value form-control"/>
                            <select class="hide filter_value form-control" multiple></select>
                        </td>
                        <td  style="width: 5%">
                            <i class="fa-solid fa-trash-can form-control filter-delete-row"></i>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary apply-filter">Apply</button>
            <button type="button" class="btn btn-primary clear-filter">Clear filter</button>
        </div>
        </div>
    </div>
</div>

<script>
    var logged_filter_data = @json($filter_data);
    contact_form.setFilterDataOnForm(logged_filter_data['custom_filter']);
</script>