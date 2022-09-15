// var column_property =         [
//     {
//         'class_name' : 'contact_name',
//         'name' : 'contact_name',
//         'data' : 'contact_name',
//         'db_name'       : 'vContactName',
//         'db_table'      : 'contacts',
//         'title' : 'Contact Name',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
       
//         'class_name' : 'linked_url',
//         'name' : 'linked_url',
//         'data' : 'linked_url',
//         'db_name'       : 'vLinkedURL',
//         'db_table'      : 'contacts',
//         'title' : 'Contact LinkedIn',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'connection_status',
//         'name' : 'connection_status',
//         'data' : 'connection_status',
//         'db_name'       : 'eConnectionStatus',
//         'db_table'      : 'contact_interaction',
//         'title' : 'Connection Status',
//         'source' : column_pre_data['eConnectionStatus'],
//         'type' : 'dropdown'
//     },
//     {
//         'class_name' : 'message_status',
//         'name' : 'message_status',
//         'data' : 'message_status',
//         'db_name'       : 'eMessageStatus',
//         'db_table'      : 'contact_interaction',
//         'title' : 'Message Status',
//         'source' :  column_pre_data['eMessageStatus'],
//         'type' : 'dropdown'
//     },
//     {
//         'class_name' : 'message',
//         'name' : 'message',
//         'data' : 'message',
//         'db_name'       : 'tMessage',
//         'db_table'      : 'contact_interaction',
//         'title' : 'Last Message',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'message_by',
//         'name' : 'message_by',
//         'data' : 'message_by',
//         'db_name'       : 'vMessageBy',
//         'db_table'      : 'contact_interaction',
//         'title' : 'Message By',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'message_date',
//         'name' : 'message_date',
//         'data' : 'message_date',
//         'db_name'       : 'dMessageDate',
//         'db_table'      : 'contact_interaction',
//         'title' : 'Message Date',
//         'source_data' : '',
//         'type' : 'date'
//     },
//      {
//         'class_name' : 'message_time',
//         'name' : 'message_time',
//         'data' : 'message_time',
//         'db_name'       : 'dMessageTime',
//         'db_table'      : 'contact_interaction',
//         'title' : 'Message Time',
//         'source_data' : '',
//         'type' : 'time'
//     },
//     {
//         'class_name'    : 'status_date',
//         'name'          : 'status_date',
//         'data'          : 'status_date',
//         'db_name'       : 'dtStatusDate',
//         'db_table'      : 'contacts',
//         'title'         : 'Status Date',
//         'source_data'   : '',
//         'type'          : 'date'
//     },
//     {
//         'class_name' : 'conversation_date',
//         'name' : 'conversation_date',
//         'data' : 'last_conv_date',
//         'db_name'       : 'dtLastConversationDate',
//         'db_table'      : 'contacts',
//         'title' : 'Recent Converstion Date',
//         'source_data' : '',
//         'type' : 'date'
//     },
//     {
//         'class_name' : 'next_steps',
//         'name' : 'next_steps',
//         'data' : 'next_steps',
//         'db_name'       : 'vNextSteps',
//         'db_table'      : 'contacts',
//         'title' : 'Next Steps',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'next_action_date',
//         'name' : 'next_action_date',
//         'data' : 'next_action_date',
//         'db_name'       : 'dtNextActionDate',
//         'db_table'      : 'contacts',
//         'title' : 'Next Action Date',
//         'source_data' : '',
//         'type' : 'date'
//     },
//     {
//         'class_name'    : 'communication_status',
//         'name'          : 'communication_status',
//         'data'          : 'communication_status',
//         'db_name'       : 'eStatus',
//         'db_table'      : 'contacts',
//         'title'         : 'Communication Status',
//         'source'        : column_pre_data['eStatus'],
//         'type'          : 'dropdown'
//     },
//     {
//         'class_name' : 'relationship_status',
//         'name' : 'relationship_status',
//         'data' : 'relationship_status',
//         'db_name'       : 'eRelationshipStatus',
//         'db_table'      : 'contacts',
//         'title' : 'Relationship Status',
//         'source' : column_pre_data['eRelationshipStatus'],
//         'type' : 'dropdown'
//     },
//     {
//         'class_name' : 'designation',
//         'name' : 'designation',
//         'data' : 'designation',
//         'db_name'       : 'vDesignation',
//         'db_table'      : 'contacts',
//         'title' : 'Designation',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'reporting_manager',
//         'name' : 'reporting_manager',
//         'data' : 'reporting_manager',
//         'db_name'       : 'vReportingManager',
//         'db_table'      : 'contacts',
//         'title' : 'Reporting Manager',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'organization_name',
//         'name' : 'organization_name',
//         'data' : 'organization_name',
//         'db_name'       : 'vOrganizationName',
//         'db_table'      : 'contacts',
//         'title' : 'Current Company Name',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'website',
//         'name' : 'website',
//         'data' : 'website',
//         'db_name'       : 'vWebsite',
//         'db_table'      : 'contacts',
//         'title' : 'Company Website',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'previous_relationship',
//         'name' : 'previous_relationship',
//         'data' : 'previous_relationship',
//         'db_name'       : 'vPreviousRelationShip',
//         'db_table'      : 'contacts',
//         'title' : 'Relationship History(Year 2005+)',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'industry',
//         'name' : 'industry',
//         'data' : 'industry',
//         'db_name'       : 'vIndustry',
//         'db_table'      : 'contacts',
//         'title' : 'Industry',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'city',
//         'name' : 'city',
//         'data' : 'city_name',
//         'db_name'       : 'iCityId',
//         'db_table'      : 'contacts',
//         'title' : 'City',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'state',
//         'name' : 'state',
//         'data' : 'state_name',
//         'db_name'       : 'iStateId',
//         'db_table'      : 'contacts',
//         'title' : 'State',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'country',
//         'name' : 'country',
//         'data' : 'country_name',
//         'db_name'       : 'iCountryId',
//         'db_table'      : 'contacts',
//         'title' : 'Country',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'discussion_points',
//         'name' : 'discussion_points',
//         'data' : 'discussion_points',
//         'db_name'       : 'tDiscussionPoints',
//         'db_table'      : 'contacts',
//         'title' : 'Discussion Points',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'email',
//         'name' : 'email',
//         'data' : 'email',
//         'db_name'       : 'vEmail',
//         'db_table'      : 'contacts',
//         'title' : 'Email',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'reachout_category',
//         'name' : 'reachout_category',
//         'data' : 'reachout_category',
//         'db_name'       : 'eReachoutCategory',
//         'db_table'      : 'contacts',
//         'title' : 'Reach-out Category',
//         'source' : column_pre_data['eReachoutCategory'],
//         'type' : 'dropdown'
//     },
//     {
//         'class_name' : 'work_number',
//         'name' : 'work_number',
//         'data' : 'work_number',
//         'db_name'       : 'vWorkNumber',
//         'db_table'      : 'contacts',
//         'title' : 'Work Number',
//         'source_data' : '',
//         'type' : 'numeric'
//     },
//     {
//         'class_name' : 'mobile_number',
//         'name' : 'mobile_number',
//         'data' : 'mobile_number',
//         'db_name'       : 'vMobileNumber',
//         'db_table'      : 'contacts',
//         'title' : 'Mobile Number',
//         'source_data' : '',
//         'type' : 'numeric'
//     },
//     {
//         'class_name' : 'category',
//         'name' : 'category',
//         'data' : 'category',
//         'db_name'       : 'eCategory',
//         'db_table'      : 'contacts',
//         'title' : 'Lead Category',
//         'source' : column_pre_data['eCategory'],
//         'type' : 'dropdown'
//     },
//     {
//         'class_name' : 'touch_points',
//         'name' : 'touch_points',
//         'data' : 'touch_points',
//         'db_name'       : 'eTouchPoints',
//         'db_table'      : 'contacts',
//         'title' : 'Touch Points',
//         'source' : column_pre_data['eTouchPoints'],
//         'type' : 'dropdown',
//         'editor': 'select',
//         'multiple': true
//     },
//     {
//         'class_name' : 'adaptability',
//         'name' : 'adaptability',
//         'data' : 'adaptability',
//         'db_name'       : 'eAdaptability',
//         'db_table'      : 'contacts',
//         'title' : 'Adaptability to Change',
//         'source' : column_pre_data['eAdaptability'],
//         'type' : 'dropdown'
//     },
//     {
//         'class_name' : 'disposition_towards',
//         'name' : 'disposition_towards',
//         'data' : 'disposition_towards',
//         'db_name'       : 'eDispositionTowards',
//         'db_table'      : 'contacts',
//         'title' : 'Disposition Towards',
//         'source' : column_pre_data['eDispositionTowards'],
//         'type' : 'dropdown'
//     },
//     {
//         'class_name' : 'coverage',
//         'name' : 'coverage',
//         'data' : 'coverage',
//         'db_name'       : 'eCoverage',
//         'db_table'      : 'contacts',
//         'title' : 'Coverage',
//         'source' : column_pre_data['eCoverage'],
//         'type' : 'dropdown'
//     },
//     {
//         'class_name' : 'response',
//         'name' : 'response',
//         'data' : 'response',
//         'db_name'       : 'tResponse',
//         'db_table'      : 'contacts',
//         'title' : 'Response',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'contact_id',
//         'name' : 'contact_id',
//         'data' : 'contact_id',
//         'db_name'       : 'iContactId',
//         'db_table'      : 'contacts',
//         'title' : 'Contact',
//         'source_data' : '',
//         'type' : 'text'
//     },
//     {
//         'class_name' : 'contact_interaction_id',
//         'name' : 'contact_interaction_id',
//         'data' : 'contact_interaction_id',
//         'db_name'       : 'iContactInteractionId',
//         'db_table'      : 'contact_interaction',
//         'title'     : 'contact_interaction_id',
//         'source_data' : '',
//         'type' : 'text'
//     }
// ]
var hot;

var contact_form = {
    init:function(){

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        });

        contact_form.dom_events();
        contact_form.plugin_initialize();
    },
    dom_events:function(){

        $(document).off('click','.save-remainder');
        $(document).on('click','.save-remainder',function(){
            
            if(!$('#remainder_form').valid()){
                return false;
            }

            var save_obj = {
                'remainder_date_time'   : $('#remainder_date_time').val(),
                'notes'                 : $('#message-text').val(),
                'contacts'              : $('#contacts').val(),
                'contacts_name'         : $('#contacts_name').val(),
                'attendees'             : $('#attendees').val()
            }

            // $.ajaxSetup({
            //     headers: {
            //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //     },
            // });

            $.ajax({
                url         : "set_remainder",
                dataType    : "json",
                type        : "POST",
                data        : save_obj,
                async       : true,
                success: function (data) {
                    if(data.success == 1){
                        $('option').attr('selected', false);
                        $(".chosen-select").val('').trigger("chosen:updated");
                        $(".select-2").val('').trigger('change');
                        $("#remainder_date_time").val('');
                        $("#message-text").val('');
                        $("#contacts_name").val('');
                        $("#contacts").val('');
                        
                        fetchReminderCount();
                        $('.close').trigger('click');
                        setMessage('Reminder has been created successfully','.panel-heading',true);
                    }else{
                        setMessage('Error occurred while creating reminder','.modal-footer',false);
                    }
                }
            });             
        });

        $('#remainderModal').on('show.bs.modal', function (event) {
            var hotInstance     = $("#dataTable").handsontable('getInstance');
            $(this).find('.modal-body .contactlist-ul').remove();

            var contact_string  = '<ul class="contactlist-ul">';
            var tmp_linked_url  = '';
            var tmp_contact_name= '';

            $('input.checkbox-input:checked').each(function () {
                var linked_url  = hotInstance.getDataAtCell($(this).attr('data-row'),1);
                var contact_name= hotInstance.getDataAtCell($(this).attr('data-row'),0);
                
                if(linked_url == '' || linked_url == null ){
                    return false;
                }
                contact_string += '<li>'+linked_url+' [ '+contact_name+' ] '+'</li>';
                
                if(tmp_linked_url == ''){
                    tmp_linked_url  = linked_url;
                }else{
                    tmp_linked_url  = ','+linked_url;
                } 
                
                if(tmp_contact_name == ''){
                    tmp_contact_name  = contact_name;
                }else{
                    tmp_contact_name  = ','+contact_name;
                } 

            });

            contact_string  += '</ul>';

            $(this).find('.modal-body input#contacts').val(tmp_linked_url);
            $(this).find('.modal-body input#contacts_name').val(tmp_contact_name);
            
            $(contact_string).insertAfter($(this).find('.modal-body input#contacts'));

            if(tmp_linked_url == ''){
                $(this).find('.modal-body input#contacts').parents('.form-group').hide();
            }else{
                $(this).find('.modal-body input#contacts').parents('.form-group').show();
            }

            setTimeout(function(){  
                $("#attendees").select2({
                    tags                : true,
                    multiple            : true,
                    tokenSeparators     : [',', ' '],
                    minimumInputLength  : 3,
                    ajax: {
                        url     : "get_user",
                        dataType: 'json',
                        cache   : true,
                        delay   : 250,
                        data    : function (params) {
                            return {
                                q   : params.term
                            };
                        },
                        processResults: function (data) {
                            return {
                              results: data
                            };
                        }
                      },
                      placeholder: 'Please search attendees',
                });
                

                $('.chosen-select').chosen();
                // $(document).on('click','.save-remainder',function(){
                    //debugger;
                    $('#remainder_form').validate({ 
                        rules: {
                            attendees: {
                                required: true,
                            },
                            remainderdatetime: {
                                required: true,
                            },
                            messagetext: {
                                required: true,
                                minlength: 3
                            }
                        },
                        messages: {
                            attendees: {
                                required: "Enter attendees",
                            
                            },
                            remainderdatetime: {
                                required: "select date&time ",
                                
                            },
                            messagetext: {
                                required: "Enter Notes",
                                minlength: "Notes should be atleast 3 characters long",
                                
                            }
                        }  
                    });
                    $('#remainder_date_time, #message-text').val('');
                    $('#attendees').val(null).trigger('change');
                    $('label[id="remainder_date_time-error"], label[id="attendees-error"], label[id="message-text-error"]').text('');

            },300);
        });
        $(document).on('click','.clear-remainder',function(){
            $('#remainder_date_time, #message-text').val('');
            $('#attendees').val(null).trigger('change');
            $('label[id="remainder_date_time-error"], label[id="attendees-error"], label[id="message-text-error"]').text('');
        });
        // $(document).off('click','.filter-icon');
        // $(document).on('click','.filter-icon',function(){
        //     if($('.filterHeader').hasClass('hide')){
        //         $('.filterHeader').removeClass('hide');
        //         $('.filterHeader').show();
        //     }else{
        //         $('.filterHeader').addClass('hide');
        //         $('.filterHeader').hide();    
        //     }
        // });
        
        $('#contact-datefilter').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
            contact_form.getLoadData();
        });
      
        $('#contact-datefilter').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });

        $(document).on('change','.filter-column',function(){
            var data_type       = $('option:selected', this).attr('data-type');
            var db_column_name  = $('option:selected', this).attr('data-dbcolumn-name');

            $(this).parents('tr').find('input.filter_value').val('');
            // $(this).parents('tr').find('select.filter_value option').val('selected'.false);
            if(data_type == 'text' || data_type == 'text'){
                $(this).parents('tr').find('input.filter_value').removeClass('hide');
                //$(this).parents('tr').find('input.filter_value_date').removeClass('hide');
                var daterangepicker_instance = $(this).parents('tr').find('input.filter_value').data("daterangepicker");
                if(daterangepicker_instance != undefined){
                    daterangepicker_instance.remove();
                }
                $(this).parents('tr').find('select.filter_value').addClass('hide');
                $(this).parents('tr').find('select.filter_value').chosen("destroy")
            }else if(data_type == 'date'){
                $(this).parents('tr').find('.filter-type').html('<option value="date">NA</option>');
                $(this).parents('tr').find('.filter-type').attr('disabled',true);
                $(this).parents('tr').find('input.filter_value').removeClass('hide');
                $(this).parents('tr').find('select.filter_value').addClass('hide');
                $(this).parents('tr').find('select.filter_value').chosen("destroy")
                $(this).parents('tr').find('input.filter_value').daterangepicker({
                    opens           : 'left',
                    showDropdowns   : true,
                    linkedCalendars : false,
                    // startDate       : moment().startOf('month'),
                    // endDate         : moment().endOf('month'),
                    locale: {
                        format: 'DD-MM-YYYY',
                    },
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    }
                });

            }else if(data_type == 'time'){
                //$(this).parents('tr').find('input.filter_value_date').removeClass('hide');
                $(this).parents('tr').find('input.filter_value').removeClass('hide');
                var daterangepicker_instance = $(this).parents('tr').find('input.filter_value').data("daterangepicker");
                if(daterangepicker_instance != undefined){
                    daterangepicker_instance.remove();
                }
                $(this).parents('tr').find('select.filter_value').addClass('hide');
            }else if(data_type == 'dropdown'){
                $(this).parents('tr').find('.filter-type').html('<option value="equal_to">Is equal to</option><option value="not_equal_to">Is not equal to</option>');

                var select_option = '';
                $.each(column_pre_data[db_column_name],function(key,val){
                    select_option += '<option value="'+val+'">'+val+'</option>';
                });

                $(this).parents('tr').find('select.filter_value').removeClass('hide').html(select_option);
                $(this).parents('tr').find('select.filter_value').chosen("destroy").chosen();
                $(this).parents('tr').find('input.filter_value').addClass('hide');
                //$(this).parents('tr').find('input.filter_value_date').removeClass('hide');
            }
        });

        $(document).off('click','.apply-filter');
        $(document).on('click','.apply-filter',function(){
            var filter_data = {};
            $.each($('.filter-table tbody tr'),function(key,val){
                if(!$(val).hasClass('hide')){
                    var column_type = $(val).find('.filter-column option:selected').attr('data-type');
                    filter_data[key] = {
                        'filter_column' : $(val).find('.filter-column option:selected').attr('data-dbcolumn-name'),
                        'filter_type'   : $(val).find('.filter-type').val(),
                        'filter_value'  : (column_type == 'dropdown')?$(val).find('select.filter_value').val():$(val).find('input.filter_value').val(),
                        'table_name'    : $(val).find('.filter-column option:selected').attr('data-table-name')
                    }
                }
            });
            
            contact_form.getLoadData(filter_data,'filter');
        });

        $(document).off('click','.add_new_filter');
        $(document).on('click','.add_new_filter',function(){
            var table_first_row = $('.filter-table').find('tr.hide').clone();
            $('.filter-table').append(table_first_row.removeClass('hide'));
        });

        $(document).off('click','.filter-delete-row');
        $(document).on('click','.filter-delete-row',function(){
            $(this).parents('tr').remove();
        });

        $(document).off('click','.clear-filter');
        $(document).on('click','.clear-filter',function(){
            $.each($('.filter-table tbody tr'),function(key,val){
                if(!$(val).hasClass('hide')){
                    var column_type = $(val).find('.filter-column option:selected').attr('data-type');
                    if(column_type == 'dropdown'){
                        $(val).find('select.filter_value option').attr('selected', false);
                        $(val).find('select.filter_value').val('').trigger("chosen:updated");
                    }else{
                        $(val).find('input.filter_value').val('');
                    }
                }
            });
        });

        $(document).off('click','.main-checkbox-input');
        $(document).on('click','.main-checkbox-input',function(){
            if($(this).is(':checked')){
                $('.checkbox-input').prop('checked',true);
            }else{
                $('.checkbox-input').prop('checked',false);
            }
        });

        $(document).off('click','.export-btn');
        $(document).on('click','.export-btn',function(){
            
            if($('.main-checkbox-input').is(':checked') || $('.checkbox-input').is(':checked')){
                
                var selected_row_ids = [];
                if($('.main-checkbox-input').is(':checked')){
                    $.each($(".checkbox-input"), function (K, V) {
                        selected_row_ids.push($("#dataTable").handsontable('getInstance').getDataAtCell($(V).attr('data-row'),33));
                    });
                }else if($('.checkbox-input').is(':checked')){
                    $.each($(".checkbox-input:checked"), function (K, V) {    
                        selected_row_ids.push($("#dataTable").handsontable('getInstance').getDataAtCell($(V).attr('data-row'),33));        
                    });
                }
                window.open("export_data?row_ids="+selected_row_ids,'_blank')
            } else {
                alert("Select any item");
            }
            
        });
    },
    plugin_initialize:function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = dd+'/'+mm+'/'+yyyy;  
        $('#contact-datefilter').daterangepicker({
            opens           : 'left',
            showDropdowns   : true,
            linkedCalendars : false,
            startDate       : moment().startOf('month'),
            endDate         : moment().endOf('month'),
            maxDate         : today,
            locale: {
                format: 'DD-MM-YYYY',
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        });

        // $('#remainder_date_time').datetimepicker({
        //     format:'d/m/Y H:i:s'
        // });          
        
        $('#remainder_date_time').daterangepicker({
            opens           : 'left',
            showDropdowns   : true,
            singleDatePicker: true,   
            timePicker      : true,  
            minDate         : new Date(),
            startDate       : new Date(),
            maxDate         : today,
            locale: {
                format: 'DD/MM/YYYY hh:mm A',
            }
        });

        contact_form.initialize_handsontable();     
    },
    initialize_handsontable:function(){
        hot = $('#dataTable').handsontable({
            data            : contact_form.getLoadData(),
            columns         : contact_form.getColumns(),
            // colHeaders      : true,
            rowHeaders      : true,
            columnSorting   : true,
            rowHeights      : 40,
            height          : 'auto',
            width           : 'auto',
            stretchH        : 'all',
            manualColumnResize: true,
            manualRowResize: true,
            minSpareRows    : 1,
            minRows         : 5,
            fixedColumnsStart: 2,
            licenseKey      : 'non-commercial-and-evaluation',
            customBorders   : true,
            filters         : false,
            // dropdownMenu    : ['filter_by_condition', 'filter_action_bar'],
            manualRowMove   : true,
            manualColumnMove: true,
            autoWrapRow     : true,
            contextMenu     : ['row_above', 'row_below', 'remove_row'],
            hiddenColumns   : {
                columns: [33,34],
                indicators: false
            },
                // $('.htCore .cornerHeader').html('<input type="checkbox" class="main-checkbox-input">');
            afterGetColHeader: function(col, TH) {
                if(col == '-1'){
                    $(TH).find('.cornerHeader').html('<input type="checkbox" class="main-checkbox-input">'); 
                }
                // contact_form.addInput(col,TH);
               
            },
            afterGetRowHeader: drawCheckboxInRowHeaders,
            beforeChange     : function(obj) {
                if(obj[0][1] == 'contact_id' || obj[0][1] == 'contact_interaction_id'){
                    return false;
                }

                if(obj[0][3] === "Please select value"){
                    return false;
                }
                
                if(obj[0][3] == '' || obj[0][3] == null){
                    return false;
                }

                if(obj[0][2] != '' && (obj[0][2] == obj[0][3])){
                    return false;
                }
                // if(obj[0][1]=='last_conv_date') {
                    // if(typeof(obj[0][1]) == 'string') {
                    //     return false;
                    // }else {
                    //     return true;
                    // }
                // }
               

                if($.inArray(obj[0][1], ["connection_status","message_status","message","message_by","message_date","message_time"]) != -1) {
                    var current_instance = $("#dataTable").handsontable('getInstance');
                    
                    if(current_instance.getDataAtCell(obj[0][0],33) == '' || current_instance.getDataAtCell(obj[0][0],33) == null){
                        setMessage('Please fill contact details first and followed by other details','.panel-heading',false);
                        return false;
                    }
                }
            },
            afterChange     : function (change, source) {
                if (source === 'loadData') {
                  return; //don't save this change
                }

                const col_props = column_property.filter(function(val){   
                    return val.name == change[0][1]; 
                });

                change[0][4]    = col_props[0]['db_name'];
                change[0][5]    = col_props[0]['db_table'];
                change[0][6]    = col_props[0]['type'];
                change[0][7]    = this.getDataAtCell(change[0][0],1);
                change[0][8]    = this.getDataAtCell(change[0][0],33);
                change[0][9]    = this.getDataAtCell(change[0][0],34);
                change[0][10]   = col_props[0]['title'];
                change[0][11]   = this.getDataAtCell(change[0][0],0);

                $.ajax({
                    url         : "update_data",
                    dataType    : "json",
                    type        : "POST",
                    contentType : 'application/json; charset=utf-8',
                    data        : JSON.stringify(change),
                    async       : true,
                    processData : false,
                    cache       : false,
                    error: function() {
                        setMessage('Error occurred while updating column data','.panel-heading',false);
                    },
                    success: function (data) {
                        if(data.success == 1){
                            var currentInstance = $("#dataTable").handsontable('getInstance');
                            // if(data.db_table == 'contacts'){
                            //     currentInstance.setDataAtCell(change[0][0],33,data.insert_id);
                            // }else if(data.db_table == 'contact_interaction'){
                            //     currentInstance.setDataAtCell(change[0][0],34,data.insert_id);                                
                            // }

                            if(typeof data['insert_id'] != "undefined" && data['insert_id'] != ''){
                                contact_form.getLoadData();
                            }
                            setMessage('Column data is updated successfully','.panel-heading',true);
                        }else{
                            setMessage('Error occurred while updating column data','.panel-heading',false);
                        }
                    }
                });
            }
            // , 
            // beforeRemoveRow: function(index, amount) {
            //     return false;
            // }
        });
    },
    getColumns:function(){
        var columns_obj = [];
        $.each(column_property, function(i, val){
            // if(val.name == 'touch_points'){
            //     var obj = { 
            //         'title': val.title,
            //         'editor': "select",
            //         // 'width': 150,
            //         // 'chosenOptions': {
            //         //     'multiple': true,
            //         //     'data': val.data
            //         // },
            //         'selectOptions':val.source,
            //         'multiple':true
            //         // 'data': val.data
            //     };
            // }else{
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();
                if(dd<10) {
                    dd='0'+dd
                } 
                if(mm<10) {
                    mm='0'+mm
                } 
              //  today = dd+'/'+mm+'/'+yyyy; 
                today = mm+'/'+dd+'/'+yyyy; 

                var obj = { 
                    'title': val.title,
                    'type': val.type,
                    'source':val.source,
                    'data': val.data,
                    'name':val.name
                };

                if(val.type == 'time'){
                    obj['timeFormat']       = 'h:mm:ss a';
                    obj['correctFormat']    = true;
                }else if(val.type == 'date'){
                    obj['correctFormat']    = true;
                    if(val.name == 'status_date' || val.name == 'last_conv_date') {
                        obj['datePickerConfig'] = {
                            disableDayFn(date) {
                                var d = date.getDate();
                                var m = date.getMonth()+1; 
                                var y = date.getFullYear();
                                if(d<10) {
                                    d='0'+d
                                } 
                                if(m<10) {
                                    m='0'+m
                                } 
                                date = m+'/'+d+'/'+y; 
                                console.log(date);
                                console.log("today: "+today);

                                var d1 = new Date(date);
                                var d2 = new Date(today);
                                if(d1 <= d2){
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    }   
                }else if(val.type == 'dropdown'){	
                    // console.log(obj['source']);
                    obj['placeholder']    = "Please select value";
                    obj['source'].splice(0, 0, "Please select value");
                }
            
            columns_obj.push(obj);
        });

        return columns_obj;
    },
    getLoadData:function(extra_data = '', call_from = ''){
        $.ajax({
            url     : "get_contact",
            dataType: 'json',
            data    : {'start_date' : $('#contact-datefilter').val().split(" - ")[0],'end_date' : $('#contact-datefilter').val().split(" - ")[1],extra_data},
            type    : 'GET',
            success : function (res) {
                if(call_from == 'filter'){
                    $('.close').trigger('click');
                }
                $('#dataTable').data('handsontable').loadData(res.data);
            }
        });
    },
    addInput:function(col, TH){
        if (typeof col !== 'number') {
          return col;
        }
      
        if (col >= 0 && TH.childElementCount < 2) {
          TH.appendChild(contact_form.getInitializedElements(col));
        }
    },
    getInitializedElements:function(colIndex){
        const div           = document.createElement('div');
        const input         = document.createElement('input');
        div.className       = 'filterHeader';
        input.placeholder   = "Please search here";
        input.className     = 'form-control';
        contact_form.addEventListeners(input, colIndex);

        div.appendChild(input);

        return div;
    },
    addEventListeners:function(input, colIndex){
        input.addEventListener('keydown', event => {
            debounceFn(colIndex, event);
        });
    }
    
}

const debounceFn = Handsontable.helper.debounce((colIndex, event) => {
    const filtersPlugin = $('#dataTable').data('handsontable').getPlugin('filters');
    filtersPlugin.removeConditions(colIndex);
    filtersPlugin.addCondition(colIndex, 'contains', [event.target.value]);
    filtersPlugin.filter();
}, 100);

function drawCheckboxInRowHeaders(row, TH) {
    var input       = document.createElement('input');
    input.type      = 'checkbox';
    input.className = 'checkbox-input';
    input.setAttribute("data-row", row);

    if (row >= 0 && this.getDataAtRowProp(row, '0')) {
        input.checked = true;
    }

    Handsontable.dom.empty(TH);

    TH.appendChild(input);
}

$(document).ready(function(){
    contact_form.init();
});