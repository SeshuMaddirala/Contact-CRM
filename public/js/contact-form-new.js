var handsontable_instance;
var page_start      = 0;
var current_page    = 1;
var per_page        = 10;

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

            $.ajax({
                url         : "set_remainder",
                dataType    : "json",
                type        : "POST",
                data        : save_obj,
                async       : true,
                success: function (data) {
                    
                    $('body').css('cursor','default');
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
                        $('.checkbox-input').prop('checked',false);
                        $('.main-checkbox-input').prop('checked',false);
                        setMessage('Reminder has been created successfully','.panel-heading',true);
                    }else{
                        setMessage('Error occurred while creating reminder','.modal-footer',false);
                    }
                },
                beforeSend:function(){
                    $('body').css('cursor','progress');
                }
            });
        });

        $('#remainderModal').on('shown.bs.modal', function (event) {
            var hotInstance     = $("#dataTable").handsontable('getInstance');
            $(this).find('.modal-body .contactlist-ul').remove();

            var contact_string  = '<ul class="contactlist-ul">';
            var tmp_linked_url  = '';
            var tmp_contact_name= '';

            $('.ht_clone_inline_start input.checkbox-input:checked').each(function () {
                var linked_url  = hotInstance.getDataAtCell($(this).attr('data-row'),1);
                var contact_name= hotInstance.getDataAtCell($(this).attr('data-row'),0);

                linked_url      = (linked_url == '' || linked_url == null)?'':linked_url;
                contact_name    = (contact_name == '' || contact_name == null)?'':contact_name;

                contact_string += '<li>'+contact_name+' [ '+linked_url+' ] '+'</li>';
                
                tmp_linked_url += (tmp_linked_url == '')?linked_url:','+linked_url;
                tmp_contact_name  = (tmp_contact_name == '')?contact_name:','+contact_name;

                // if(tmp_linked_url == ''){
                //     tmp_linked_url  = linked_url;
                // }else{
                //     tmp_linked_url  += ','+linked_url;
                // } 
                
                // if(tmp_contact_name == ''){
                //     tmp_contact_name  = contact_name;
                // }else{
                //     tmp_contact_name  += ','+contact_name;
                // } 

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
            
            $("#attendees").select2({
                tags                : true,
                multiple            : true,
                // tokenSeparators     : [',', ' '],
                minimumInputLength  : 3,
                placeholder         : 'Please search attendees',
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
                createTag: function (params) {
                    // // Don't offset to create a tag if there is no @ symbol
                    if (params.term.indexOf('@') === -1) {
                        return null;
                    }
                    return {
                        id: params.term,
                        text: params.term
                    }
                }
            });

            $('#remainder_date_time').daterangepicker({
                opens           : 'left',
                drops           : 'auto',
                showDropdowns   : true,
                singleDatePicker: true,   
                timePicker      : true,  
                minDate         : new Date(),
                startDate       : new Date(),
                // maxDate         : today,
                locale: {
                    format: 'DD/MM/YYYY hh:mm A',
                }
            });

            $('#remainder_form .chosen-select').chosen("destroy").chosen();                
            $('#remainder_form').validate({ 
                rules: {
                    // attendees: {
                    //     required: true,
                    // },
                    remainderdatetime: {
                        required: true,
                    },
                    messagetext: {
                        required: true,
                        minlength: 3
                    }
                },
                messages: {
                    // attendees: {
                    //     required: "Enter attendees",
                    // },
                    remainderdatetime: {
                        required: "Please select date&time ",
                        
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
        });

        $('#filterModal').on('shown.bs.modal', function (event) {     
            $('.filter-table .chosen-select').chosen("destroy").chosen();      
            contact_form.setFilterDataOnForm(logged_filter_data['custom_filter']);
        });

        $(document).off('click','.clear-remainder');
        $(document).on('click','.clear-remainder',function(){
            $('#remainder_date_time, #message-text').val('');
            $('#attendees').val(null).trigger('change');
            $('label[id="remainder_date_time-error"], label[id="attendees-error"], label[id="message-text-error"]').text('');
        });

        $('#contact-datefilter').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
            contact_form.getLoadData();
        });
      
        $('#contact-datefilter').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
            contact_form.getLoadData();
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
                    drops           : 'auto',
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
                $(this).parents('tr').find('select.filter_value').chosen("destroy");
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
                        'table_name'    : $(val).find('.filter-column option:selected').attr('data-table-name'),
                        'column_type'   : column_type
                    }
                }
            });
            
            // contact_form.getLoadData(filter_data,'filter');
            contact_form.getLoadData('filter');
        });

        $(document).off('click','.add_new_filter');
        $(document).on('click','.add_new_filter',function(){
            var table_first_row = $('.filter-table').find('tr.hide').clone();
            table_first_row.find('select:not(.hide)').addClass('chosen-select');
            $('.filter-table').append(table_first_row.removeClass('hide'));
            $('.filter-table .chosen-select').chosen("destroy").chosen();                
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
            
            contact_form.getLoadData();
            $('.close').trigger('click');
        });
        
        $('#exportModal').on('show.bs.modal', function (event) {   
            if(!$('.main-checkbox-input').is(':checked') && !$('.ht_clone_inline_start .checkbox-input').is(':checked')){
                alert("Please select atleast one contact to export");
                return event.preventDefault(); 
            }
        });

        $(document).off('click','.ht_clone_inline_start .checkbox-input');
        $(document).on('click','.ht_clone_inline_start .checkbox-input',function(){
            if(!$(this).is(':checked')){
                $('.main-checkbox-input').prop('checked',false);
            }else{
                if($('.ht_clone_inline_start .checkbox-input:not(:checked)').length <= 0){
                    $('.main-checkbox-input').prop('checked',true);
                }
            }
        });

        $(document).off('click','.main-checkbox-input');
        $(document).on('click','.main-checkbox-input',function(){
            if($(this).is(':checked')){
                $('.ht_clone_inline_start .checkbox-input').prop('checked',true);
            }else{
                $('.ht_clone_inline_start .checkbox-input').prop('checked',false);
            }
        });

        $(document).off('click','.export-btn');
        $(document).on('click','.export-btn',function(){
            
            if($('.main-checkbox-input').is(':checked') || $('.ht_clone_inline_start .checkbox-input').is(':checked')){

                var contact_id  = '';
                $.each(column_property,function(key,val){
                    if(val.db_name == 'iContactsId'){
                        contact_id = key;
                    }
                });

                var selected_row_ids = [];
                var selected_column  = [];
                var unselected_column  = [];
                if($('.main-checkbox-input').is(':checked')){
                    $.each($(".ht_clone_inline_start .checkbox-input"), function (K, V) {
                        selected_row_ids.push($("#dataTable").handsontable('getInstance').getDataAtCell($(V).attr('data-row'),contact_id));
                    });
                }else if($('.ht_clone_inline_start .checkbox-input').is(':checked')){
                    $.each($(".ht_clone_inline_start .checkbox-input:checked"), function (K, V) {    
                        selected_row_ids.push($("#dataTable").handsontable('getInstance').getDataAtCell($(V).attr('data-row'),contact_id));        
                    });
                }
                $.each($(".export-col-checkbox"), function (K1, V1) {
                    if($(this).is(':checked')){
                        selected_column.push($(this).attr('data-dbcolumn-name'));
                    }else{
                        unselected_column.push($(this).attr('data-dbcolumn-name'));
                    }        
                });
                selected_row_ids = selected_row_ids.filter(Boolean);
                if(selected_column.length <= 0){
                    alert("Please select atleast one column");
                    return false;
                }
                $('#exportModal').modal('hide');
                
                window.open("export_data?row_ids="+selected_row_ids+"&unselected_column="+btoa(unselected_column),'_blank');
            } else {
                alert("Please select atleast one contact to export");
            }
            
        });

        $(document).off('click','.add-new-contact');
        $(document).on('click','.add-new-contact',function(){
            var curr_instance = $("#dataTable").handsontable('getInstance');            
            curr_instance.alter('insert_row', 0, 1);
        });

        $(document).off('change','.export-check-uncheck');
        $(document).on('change','.export-check-uncheck',function(){
            if($(this).prop('checked')){
                $('.export-col-checkbox').prop("checked", true);
            }else{
                $('.export-col-checkbox').prop("checked", false);
            }
        });

        $(document).off('click','.export-contact-modal .export-col-checkbox');
        $(document).on('click','.export-contact-modal .export-col-checkbox',function(){
            if(!$(this).is(':checked')){
                $('.export-check-uncheck').bootstrapToggle('off');
            }else{
                if($('.export-col-checkbox:not(:checked)').length <= 0){
                    $('.export-check-uncheck').bootstrapToggle('on');
                }
            }

        });

        $(document).off('click','.table_paginate .paginate_btn');
        $(document).on('click','.table_paginate .paginate_btn',function(){
            if($(this).hasClass('current')){
                return false;
            }
            per_page    = $('.table_length_select').val();
            current_page= $(this).attr('data-idx');
            page_start  = (per_page * current_page - per_page);

            contact_form.getLoadData();
        });

        $(document).on('change','.tables_length .table_length_select',function(){
            
            per_page    = $('.table_length_select').val();
            current_page= $('.table_paginate .paginate_btn.current').attr('data-idx');
            page_start  = (per_page * current_page - per_page);

            contact_form.getLoadData();
        });
        
    },
    plugin_initialize:function(){
        
        // var start_date  = moment().startOf('month');
        // var end_date    = moment().endOf('month');
        var start_date    = '';
        var end_date      = '';

        if(!$.isEmptyObject(logged_filter_data) && logged_filter_data['global_filter'] != ''){
            start_date  = logged_filter_data['global_filter']['start_date']; 
            end_date    = logged_filter_data['global_filter']['end_date'];
        }

        $('#contact-datefilter').daterangepicker({
            opens           : 'left',
            drops           : 'auto',
            showDropdowns   : true,
            linkedCalendars : false,
            autoUpdateInput : (start_date != '')?true:false,
            startDate       : (start_date != '')?start_date:false,
            endDate         : (end_date != '')?end_date:false,
            maxDate         : new Date(),
            locale: {
                format: 'DD-MM-YYYY',
                cancelLabel: 'Clear'
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

        contact_form.initialize_handsontable();
        // contact_form.initialize_jqgrid();Inprocess     
    },
    // initialize_jqgrid:function(){//Inprocess
    //     var filter_data             = contact_form.getFilterData();
    //     filter_data['call_from']    = 'onload';
        
    //     $("#43rowed3").jqGrid({
    //         url:'get_contact?call_from=onload',
    //         datatype: "json",
    //         // colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
    //         colModel:contact_form.getColumns(),
    //         rowNum:10,
    //         rowList:[10,20,30],
    //         // pager: '#p43rowed3',
    //         sortname: 'id',
    //         viewrecords: true,
    //         sortorder: "desc",
    //         editurl: "server.php",
    //         caption: "Contact Excel",
    //         shrinkToFit: false,
    //         gridComplete: function(){
    //             // $('#43rowed3').jqGrid('setGridWidth', '1000'); // max width for grid
    //         }
    //     });
    //     // $("#43rowed3").jqGrid('navGrid',"#p43rowed3",{edit:false,add:false,del:false});
    //     // $("#43rowed3").jqGrid('inlineNav',"#p43rowed3");
    // },
    initialize_handsontable:function(){

        handsontable_instance = $('#dataTable').handsontable({
            data            : contact_form.getLoadData('onload'),
            columns         : contact_form.getColumns(),
            // colHeaders      : true,
            rowHeaders      : true,
            columnSorting   : true,
            colWidths       : 300,
            rowHeights      : 40,
            height          : '75%',
            width           : 'auto',
            stretchH        : 'all',
            manualColumnResize: true,
            // persistentState:true,
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
            // contextMenu     : ['row_above', 'row_below', 'remove_row'],
            contextMenu     : ['row_above', 'row_below'],
            hiddenColumns   : {
                columns: hidden_column_id,
                indicators: false
            },
            afterGetColHeader: function(col, TH) {
                if(col == '-1'){
                    $(TH).find('.cornerHeader').html('<input type="checkbox" class="main-checkbox-input">'); 
                }

                var add_custom_class_column = ['Connection Status','Message Status','Last Message','Message By','Message Date','Message Time','contact_interaction_id'];
                if(add_custom_class_column.includes($(TH).find('.colHeader').html())){
                    $(TH).addClass("cyan-color");
                }
                // contact_form.addInput(col,TH);//As of now, Not in use 
            },
            afterGetRowHeader: contact_form.drawCheckboxInRowHeaders,
            beforeChange     : function(obj) {
                
                if(obj[0][1] == 'iContactsId' || obj[0][1] == 'iContactInteractionId'){
                    return false;
                }

                if(obj[0][3] === "Please select value"){
                    return false;
                }
                
                if((obj[0][2] == '' || obj[0][2] == null) && (obj[0][3] == '' || obj[0][3] == null)){
                    return false;
                }

                const col_props = column_property.filter(function(val){   
                    return val.db_name == obj[0][1]; 
                });

                if(obj[0][3] == "" || obj[0][3] == null){
                    if(!confirm("Are you sure you want to delete data on "+col_props[0]['title']+" ?")){
                        return false;
                    }
                }

                if(col_props[0]['validate']){
                    if(!contact_form.checkValidation(obj[0])){
                        setMessage('Please provide proper data for '+col_props[0]['title'] +' cell','.panel-heading',false);
                        return false;
                    };
                }

                column_type = col_props[0]['type'];

                if(column_type == 'dropdown'){
                    if(obj[0][2] != '' && obj[0][2] != null){
                        var old_value = obj[0][2].split(',');
                        var new_value = obj[0][3].split(',');
                        
                        if(old_value.length > new_value.length){
                            var main_loop   = old_value;
                            var sub_loop    = new_value; 
                        }else{
                            var main_loop   = new_value;
                            var sub_loop    = old_value;
                        }

                        // var allow_further = true;
                        // $.each(main_loop,function(m_key,m_val){
                        //     $.each(sub_loop,function(ss_key,ss_val){
                        //         if(m_val != ss_val){
                        //             allow_further = false;
                        //         }
                        //     });
                        // });

                        // if(!allow_further){
                        //     return false;
                        // }
                    }
                }else{   
                    if(obj[0][2] != '' && (obj[0][2] == obj[0][3])){
                        return false;
                    }
                }
                
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
                
                var curr_props  = '';
                var contact_id  = '';
                var ci_id       = '';
                var alerts_to   = '';
                $.each(column_property,function(key,val){
                    if(change[0][1] == val.db_name){
                        curr_props = val;
                    }else if(val.db_name == 'iContactsId'){
                        contact_id = key;
                    }else if(val.db_name == 'iContactInteractionId'){
                        ci_id = key;
                    }else if(val.db_name == 'vAlertsTo'){
                        alerts_to = key;
                    }
                });

                change[0][4]    = curr_props['db_name'];
                change[0][5]    = curr_props['db_table'];
                change[0][6]    = curr_props['type'];
                change[0][7]    = this.getDataAtCell(change[0][0],1);
                change[0][8]    = this.getDataAtCell(change[0][0],contact_id);
                change[0][9]    = this.getDataAtCell(change[0][0],ci_id);
                change[0][10]   = curr_props['title'];
                change[0][11]   = this.getDataAtCell(change[0][0],0);
                change[0][12]   = this.getDataAtCell(change[0][0],alerts_to);

                $.ajax({
                    url         : "update_data",
                    dataType    : "JSON",
                    type        : "POST",
                    contentType : 'application/json; charset=utf-8',
                    data        : JSON.stringify(change),
                    async       : true,
                    processData : false,
                    cache       : false,
                    error       : function(jqXHR, exception) {
                        setMessage('Error occurred while updating column data','.panel-heading',false);
                    },
                    success: function (data) {
                        if(data.success == 1){
                            if(typeof data['insert_id'] != "undefined" && data['insert_id'] != ''){
                                contact_form.getLoadData();
                            }

                            if(typeof data['set_remainder_flag'] != "undefined" && data['set_remainder_flag']){
                                fetchReminderCount();
                            }
                            setMessage('Column data is updated successfully','.panel-heading',true);
                        }else{
                            var error_message = "Error occurred while updating column data";
                            if(typeof data['message'] != "undefined" && data['message'] != ''){
                                error_message = data['message'];
                                contact_form.getLoadData();
                            }
                            setMessage(error_message,'.panel-heading',false);
                        }
                    },
                    beforeSend:function(){
                        $('#loader-spinner').css("visibility", "visible");
                    },
                    complete:function(){
                        $('#loader-spinner').css("visibility", "hidden");
                    }
                });
            },
            afterSelection:function(row, column, row2, column2, preventScrolling, preventScrolling, selectionLayerLevel){
                
                preventScrolling.value = true;
                
                var row_count       = (row == row2)?1:(row > row2)?row+1:row2+1;
                var col_count       = (column == column2)?1:(column > column2)?column+1:column2+1;
                var data_row_count  = data_col_count = 0;
                var hotInstance     = $("#dataTable").handsontable('getInstance');
            
                var row_start_loop  = (row < row2)?row:row2;
                var row_end_loop    = (row > row2)?row:row2;
                var col_start_loop  = (column < column2)?column:column2;
                var col_end_loop    = (column > column2)?column:column2;
                 
                for(var i = row_start_loop; i <= row_end_loop;i++){
                    var row_data_flag = false;
                    for(var j = col_start_loop; j <= col_end_loop;j++){
                        var cell_data = hotInstance.getDataAtCell(i,j);
                        if(cell_data != '' && cell_data != null){
                            row_data_flag = true;
                            data_col_count += 1;
                        }
                    }
                    if(row_data_flag){
                        data_row_count += 1;
                    }
                }

                var selection_html  = `[ No.of rows:`+row_count+`,columns:`+col_count+` |
                        No.of Data rows:`+data_row_count+`,columns:`+data_col_count+` ]`; 
                // $('.panel-heading .selected-count').html(' - [No.of Rows:'+row_count+' AND Columns:'+col_count+' No.of Data Rows:'+data_row_count+' AND Columns:'+data_col_count+']');
                $('.panel-heading .selected-count').html(' - '+selection_html);
            },
            afterDeselect:function(){
                $('.panel-heading .selected-count').html('');
            },
            beforeColumnMove:function(movedColumns, finalIndex, dropIndex, movePossible){
                // console.log(movedColumns,'movedColumns');
                // console.log(dropIndex,'dropIndex');
                // console.log(movePossible,'movePossible');
                // console.log(finalIndex,'finalIndex');
                // // console.log(this);
                // if(dropIndex == 0 || dropIndex == 1 || dropIndex == 2 || finalIndex == 0 || finalIndex == 1 || finalIndex == 2){
                //     alert("Ad");
                //     return false;
                // }
                return true;
            },
            afterColumnMove:function(movedColumns, finalIndex, dropIndex, movePossible, orderChanged){
                
                if(orderChanged){
                    let column_sequence = this.getColHeader;
                    $.ajax({
                        url         : "update_column_sequence",
                        dataType    : "json",
                        type        : "POST",
                        data        : {'column_sequence' : column_sequence},
                        async       : true,
                        success: function (data) {
                            $('body').css('cursor','default');
                            
                            if(data.success == 1){
                                // setMessage('Reminder has been created successfully','.panel-heading',true);
                                column_property = data.column_array;
                            }else{
                                // setMessage('Error occurred while creating reminder','.modal-footer',false);
                            }
                        },
                        beforeSend:function(){
                            $('body').css('cursor','progress');
                        }
                    });
                    
                }
            },
            beforePaste:function(data, coords){
                if(data[0].length > 1){
                    setMessage('Copy and paste whole row is not allowed','.panel-heading',false);
                    return false;
                }
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
            var obj = { 
                'title' : val.title,
                'type'  : val.type,
                'source': val.source_data,
                'data'  : val.db_name,
                'name'  : val.name,
                'allowInvalid': val.validate
            };

            if(val.type == 'time'){
                obj['timeFormat']       = 'h:mm:ss a';
                obj['correctFormat']    = true;
            }else if(val.type == 'date'){
                obj['correctFormat']    = true;
                if(val.db_name == 'dtStatusDate' || val.db_name == 'dtLastConversationDate') {
                    obj['datePickerConfig'] = {
                        disableDayFn(date) { 
                            var d2 = new Date();
                            if(date <= d2){
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                }else if(val.db_name == "dtNextActionDate") {
                    obj['datePickerConfig'] = {
                        disableDayFn(date) { 
                            var d2 = new Date();
                            if(date >= d2){
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                }
            }else if(val.type == 'dropdown'){	
                obj['placeholder']  = "Please select value";
                // obj['source'].splice(0, 0, "Please select value");
                obj['renderer']     =  contact_form.customDropdownRenderer;
                obj['editor']       = "chosen";
                obj['visibleRows']  = 5;
                
                var source_data     = [];
                $.each(val.source_data,function(source_key,source_val){
                    source_data.push({'id':source_val,'label':source_val})
                });
                obj['chosenOptions']= {
                    multiple: true,
                    data    : source_data
                }
            }
            // else if(val.db_name == 'vAlertsTo'){
            //     obj['source'] = function(query, process) {
            //         $.ajax({
            //             url     : 'get_user',
            //             dataType: 'json',
            //             data    : {'q': query},
            //             success: function (response) {
            //                 var columnArr = response.map(function(row) {
            //                     return row['id'];
            //                 });
            //                 process(columnArr);
            //             }
            //         });
            //     }
            //     obj['strict'] = true;
            //     obj['multiple'] = true;
            // }

            columns_obj.push(obj);
        });

        return columns_obj;
    },
    getLoadData:function(call_from = ''){
        var filter_data             = contact_form.getFilterData();
        filter_data['call_from']    = call_from;
        filter_data['per_page']     = per_page;
        filter_data['page_start']   = page_start;

        $.ajax({
            url     : "get_contact",
            dataType: 'json',
            data    : filter_data,
            type    : 'GET',
            success : function (res) {
                if(call_from == 'filter' || call_from == 'clear_filter'){
                    $('.close').trigger('click');
                }
                if(call_from != 'onload'){
                    logged_filter_data = res.logged_filter_data;
                    $('#lblfilterCount').html(logged_filter_data['custom_filter'].length);    
                }
                $('#dataTable').data('handsontable').loadData(res.data);
                // contact_form.updatePagination(res);
            }
        });
    },
    updatePagination:function(data){

        var data_start      = page_start+1;
        var total_records   = data.total_records;
        var data_end        = (current_page*per_page);
        data_end            = (data_end > data.total_records)?data.total_records:data_end;

        var page_info       = 'Showing '+data_start+' to '+data_end+' of '+total_records+' entries';
        
        $(".table-pagination-div .table_info").html(page_info);

        var page_count      = Math.ceil(data.total_records/per_page);
        // console.log(page_count);
        var pagination_html = '<span>';
        
        pagination_html = '<a class="paginate_btn first disabled" data-idx="first">First</a>';
        pagination_html     += '<a class="paginate_btn previous disabled" data-idx="previous">Previous</a>';

        for(var i=1;i<=page_count;i++){
            if(current_page == i){
                pagination_html += '<a class="paginate_btn current" data-idx='+i+'>'+i+'</a>';
            }else{
                pagination_html += '<a class="paginate_btn" data-idx='+i+'>'+i+'</a>';
            }
        }
        pagination_html     += '<a class="paginate_btn next disabled" data-idx="next">Next</a>';
        pagination_html     +='<a class="paginate_btn last disabled" data-idx="last" >Last</a>';
        
        pagination_html += '</span>';
        
        // var pagination_html = '<a class="paginate_btn first disabled" data-idx="first">First</a>';
        // pagination_html     += '<a class="paginate_btn previous disabled" data-idx="previous">Previous</a>';
        
        // pagination_html     += '<a class="paginate_btn next disabled" data-idx="next">Next</a>';
        // pagination_html     +='<a class="paginate_btn last disabled" data-idx="last" >Last</a>';
        

        $(".table-pagination-div .table_paginate").html(pagination_html);
        // var template    = $("#table_pagination").html();
        // var data = {
        //     'total_records' : 57,
        //     'per_page'      : 10,
        //     'no_of_pages'   : 6,
        //     'previous_flag' : false,
        //     'next_flag'     : true,
        //     'current_page'  : 1
        // };
        // var text        = Mustache.render(template, data);
        // $(".table-pagination-div").html(text);
    },
    getFilterData:function(){
        var filter_obj = {
            'custom_filter': {},
            'global_filter': {},
        }
        
        var contact_datefilter =  $('#contact-datefilter').val();
        if(contact_datefilter != ''){
            filter_obj['global_filter'] = {
                'start_date': contact_datefilter.split(" - ")[0],
                'end_date'  : contact_datefilter.split(" - ")[1]
            }
        }

        $.each($('.filter-table tbody tr'),function(key,val){
            if(!$(val).hasClass('hide')){
                var column_type     =   $(val).find('.filter-column option:selected').attr('data-type');
                var filter_value    =   (column_type == 'dropdown')?$(val).find('select.filter_value').val():$(val).find('input.filter_value').val();
                
                if(filter_value != '' && filter_value != null){
                    filter_obj['custom_filter'][key] = {
                        'filter_column' : $(val).find('.filter-column option:selected').attr('data-dbcolumn-name'),
                        'filter_type'   : $(val).find('.filter-type').val(),
                        'filter_value'  : filter_value,
                        'table_name'    : $(val).find('.filter-column option:selected').attr('data-table-name'),
                        'column_type'   : column_type
                    }
                }
            }
        });

        return filter_obj;
    },
    // addInput:function(col, TH){//As of now, Not in use
    //     if (typeof col !== 'number') {
    //       return col;
    //     }
      
    //     if (col >= 0 && TH.childElementCount < 2) {
    //       TH.appendChild(contact_form.getInitializedElements(col));
    //     }
    // },
    // getInitializedElements:function(colIndex){//As of now, Not in use
    //     const div           = document.createElement('div');
    //     const input         = document.createElement('input');
    //     div.className       = 'filterHeader';
    //     input.placeholder   = "Please search here";
    //     input.className     = 'form-control';
    //     contact_form.addEventListeners(input, colIndex);

    //     div.appendChild(input);

    //     return div;
    // },
    // addEventListeners:function(input, colIndex){//As of now, Not in use
    //     input.addEventListener('keydown', event => {
    //         debounceFn(colIndex, event);
    //     });
    // },
    setFilterDataOnForm:function(filter_data = ''){
        if(filter_data != ''){
            $.each(filter_data,function(key,val){
                var tr_object = $('.filter-table tr[data-row="'+key+'"]');
                
                if(val['column_type'] == 'dropdown'){
                    tr_object.find('.filter-type').html('<option value="equal_to">Is equal to</option><option value="not_equal_to">Is not equal to</option>');

                    var select_option = '';
                    $.each(column_pre_data[val['filter_column']],function(ckey,cval){
                        var selected = "";
                        if($.inArray(cval,val['filter_value'])  !== -1){
                            selected = "selected";
                        }

                        select_option += '<option value="'+cval+'" '+selected+'>'+cval+'</option>';
                    });

                    tr_object.find('select.filter_value').removeClass('hide').html(select_option);
                    tr_object.find('select.filter_value').chosen("destroy").chosen();
                    // $('.chosen-results').off( 'DOMMouseScroll' );
                    tr_object.find('input.filter_value').addClass('hide');
                }else if(val['column_type'] == 'text' || val['column_type'] == 'time'){
                    tr_object.find('input.filter_value').val(val['filter_value']);
                    tr_object.find('input.filter_value').removeClass('hide');
                    tr_object.find('select.filter_value').addClass('hide');
                    tr_object.find('select.filter_value').chosen("destroy");
                }else if(val['column_type'] == 'date'){
                    tr_object.find('input.filter_value').daterangepicker({
                        opens           : 'left',
                        drops           : 'auto',
                        showDropdowns   : true,
                        linkedCalendars : false,
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
                    
                    tr_object.find('input.filter_value').val(val['filter_value']);
                    tr_object.find('input.filter_value').removeClass('hide');
                    tr_object.find('select.filter_value').addClass('hide');
                    tr_object.find('select.filter_value').chosen("destroy");
                }
            });
        }
    },
    checkValidation:function(col_data = ''){
        if(col_data[3] == '' || col_data[3] == null){
            return true;
        }
        var return_flag = false;
        switch(col_data[1]){
            case "vLinkedURL":
                if( /(ftp|http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(col_data[3]) ) {
                // if( /http(s)?:\/\/([w]{3}\.)?linkedin\.com\/in\/([a-zA-Z0-9-]{5,30})\/?/.test(col_data[3]) ) {
                    return true;
                }
                break;
            case "vEmail":
                if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(col_data[3])) {
                    return true;
                }
                break;
            default:
                return_flag = true;
                break;
        }
        return return_flag;
    },
    customDropdownRenderer:function(instance, td, row, col, prop, value, cellProperties) {
        var selectedId;
        var optionsList = cellProperties.chosenOptions.data;
    
        if(typeof optionsList === "undefined" || typeof optionsList.length === "undefined" || !optionsList.length) {
            Handsontable.cellTypes.dropdown.renderer(instance, td, row, col, prop, value, cellProperties);
            return td;
        }
    
        var values = (value + "").split(",");
        value = [];
        for (var index = 0; index < optionsList.length; index++) {
    
            if (values.indexOf(optionsList[index].id + "") > -1) {
                selectedId = optionsList[index].id;
                value.push(optionsList[index].label);
            }
        }
        value = value.join(", ");
    
        Handsontable.cellTypes.dropdown.renderer(instance, td, row, col, prop, value, cellProperties);
        return td;
    },
    drawCheckboxInRowHeaders:function(row, TH) {
        var input       = document.createElement('input');
        input.type      = 'checkbox';
        input.className = 'checkbox-input';
        input.setAttribute("data-row", row);

        if (row >= 0 && this.getDataAtRowProp(row, '0')) {
            input.checked = true;
        }
        // Handsontable.dom.empty(TH);
        TH.getElementsByClassName("rowHeader")[0].appendChild(input);
        // TH.appendChild(input);
    }
}

// const debounceFn = Handsontable.helper.debounce((colIndex, event) => {//As of now, Not in use
//     const filtersPlugin = $('#dataTable').data('handsontable').getPlugin('filters');
//     filtersPlugin.removeConditions(colIndex);
//     filtersPlugin.addCondition(colIndex, 'contains', [event.target.value]);
//     filtersPlugin.filter();
// }, 100);

// function customDropdownRenderer(instance, td, row, col, prop, value, cellProperties) {
//     var selectedId;
//     var optionsList = cellProperties.chosenOptions.data;

//     if(typeof optionsList === "undefined" || typeof optionsList.length === "undefined" || !optionsList.length) {
//         Handsontable.cellTypes.dropdown.renderer(instance, td, row, col, prop, value, cellProperties);
//         return td;
//     }

//     var values = (value + "").split(",");
//     value = [];
//     for (var index = 0; index < optionsList.length; index++) {

//         if (values.indexOf(optionsList[index].id + "") > -1) {
//             selectedId = optionsList[index].id;
//             value.push(optionsList[index].label);
//         }
//     }
//     value = value.join(", ");

//     Handsontable.cellTypes.dropdown.renderer(instance, td, row, col, prop, value, cellProperties);
//     return td;
// }

// function drawCheckboxInRowHeaders(row, TH) {
//     var input       = document.createElement('input');
//     input.type      = 'checkbox';
//     input.className = 'checkbox-input';
//     input.setAttribute("data-row", row);

//     if (row >= 0 && this.getDataAtRowProp(row, '0')) {
//         input.checked = true;
//     }
//     // Handsontable.dom.empty(TH);
//     TH.getElementsByClassName("rowHeader")[0].appendChild(input);
//     // TH.appendChild(input);
// }

$(document).ready(function(){
    contact_form.init();
});