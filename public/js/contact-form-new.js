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

        $('#remainderModal').on('shown.bs.modal', function (event) {
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

            $('#remainder_form .chosen-select').chosen("destroy").chosen();                
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
        });

        $('#filterModal').on('shown.bs.modal', function (event) {     
                
            $('.filter-table .chosen-select').chosen("destroy").chosen();      
            contact_form.setFilterDataOnForm(logged_filter_data['custom_filter']);
            // if(logged_filter_data['custom_filter'] != ''){
            //     $.each(logged_filter_data['custom_filter'],function(key,val){
            //         var tr_object = $('.filter-table tr[data-row="'+key+'"]');
                    
            //         if(val['column_type'] == 'dropdown'){
            //             tr_object.find('.filter-type').html('<option value="equal_to">Is equal to</option><option value="not_equal_to">Is not equal to</option>');
        
            //             var select_option = '';
            //             $.each(column_pre_data[val['filter_column']],function(ckey,cval){
            //                 var selected = "";
            //                 if($.inArray(cval,val['filter_value'])  !== -1){
            //                     selected = "selected";
            //                 }

            //                 select_option += '<option value="'+cval+'" '+selected+'>'+cval+'</option>';
            //             });
        
            //             tr_object.find('select.filter_value').removeClass('hide').html(select_option);
            //             tr_object.find('select.filter_value').chosen("destroy").chosen();
            //             tr_object.find('input.filter_value').addClass('hide');
            //         }else if(val['column_type'] == 'text' || val['column_type'] == 'time'){
            //             tr_object.find('input.filter_value').val(val['filter_value']);
            //             tr_object.find('input.filter_value').removeClass('hide');
            //             tr_object.find('select.filter_value').addClass('hide');
            //             tr_object.find('select.filter_value').chosen("destroy");
            //         }else if(val['column_type'] == 'date'){
            //             tr_object.find('input.filter_value').daterangepicker({
            //                 opens           : 'left',
            //                 showDropdowns   : true,
            //                 linkedCalendars : false,
            //                 locale: {
            //                     format: 'DD-MM-YYYY',
            //                 },
            //                 ranges: {
            //                     'Today': [moment(), moment()],
            //                     'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            //                     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            //                     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            //                     'This Month': [moment().startOf('month'), moment().endOf('month')],
            //                     'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            //                 }
            //             });
                        
            //             tr_object.find('input.filter_value').val(val['filter_value']);
            //             tr_object.find('input.filter_value').removeClass('hide');
            //             tr_object.find('select.filter_value').addClass('hide');
            //             tr_object.find('select.filter_value').chosen("destroy");
            //         }
            //     });
            // }
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
            
            contact_form.getLoadData(filter_data,'filter');
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
        });

        
        $('#exportModal').on('show.bs.modal', function (event) {   
            if(!$('.main-checkbox-input').is(':checked') && !$('.checkbox-input').is(':checked')){
                alert("Please select atleast one contact to export");
                return event.preventDefault(); 
            }
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
                    $.each($(".checkbox-input"), function (K, V) {
                        selected_row_ids.push($("#dataTable").handsontable('getInstance').getDataAtCell($(V).attr('data-row'),contact_id));
                    });
                }else if($('.checkbox-input').is(':checked')){
                    $.each($(".checkbox-input:checked"), function (K, V) {    
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

                if(selected_column.length <= 0){
                    alert("Please select atleast one column");
                    return false;
                }

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
    },
    plugin_initialize:function(){
        var today   = new Date();
        var dd      = today.getDate();
        var mm      = today.getMonth()+1; 
        var yyyy    = today.getFullYear();
        
        if(dd<10) {
            dd='0'+dd
        } 
        
        if(mm<10) {
            mm='0'+mm
        } 
        today = dd+'/'+mm+'/'+yyyy;

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
            showDropdowns   : true,
            linkedCalendars : false,
            autoUpdateInput : (start_date != '')?true:false,
            startDate       : (start_date != '')?start_date:'',
            endDate         : (end_date != '')?end_date:'',
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
            // maxDate         : today,
            locale: {
                format: 'DD/MM/YYYY hh:mm A',
            }
        });

        contact_form.initialize_handsontable();     
    },
    initialize_handsontable:function(){
        hot = $('#dataTable').handsontable({
            data            : contact_form.getLoadData({},'onload'),
            columns         : contact_form.getColumns(),
            // colHeaders      : true,
            rowHeaders      : true,
            columnSorting   : true,
            colWidths       : 300,
            rowHeights      : 40,
            height          : 'auto',
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
                // contact_form.addInput(col,TH);
            },
            afterGetRowHeader: drawCheckboxInRowHeaders,
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
                            if(typeof data['insert_id'] != "undefined" && data['insert_id'] != ''){
                                contact_form.getLoadData();
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
            afterColumnMove:function(movedColumns, finalIndex, dropIndex, movePossible, orderChanged){
                console.log(arguments);
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
                }   
            }else if(val.type == 'dropdown'){	
                obj['placeholder']  = "Please select value";
                // obj['source'].splice(0, 0, "Please select value");
                obj['renderer']     =  customDropdownRenderer;
                obj['editor']       = "chosen";
                
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
    getLoadData:function(extra_data = {},call_from = ''){
        var filter_data             = contact_form.getFilterData();
        filter_data['call_from']    = call_from;  
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
                }
                $('#dataTable').data('handsontable').loadData(res.data);
            }
        });
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
    },
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
                    tr_object.find('input.filter_value').addClass('hide');
                }else if(val['column_type'] == 'text' || val['column_type'] == 'time'){
                    tr_object.find('input.filter_value').val(val['filter_value']);
                    tr_object.find('input.filter_value').removeClass('hide');
                    tr_object.find('select.filter_value').addClass('hide');
                    tr_object.find('select.filter_value').chosen("destroy");
                }else if(val['column_type'] == 'date'){
                    tr_object.find('input.filter_value').daterangepicker({
                        opens           : 'left',
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
        var return_flag = false;
        switch(col_data[1]){
            case "vLinkedURL":
                if( /(ftp|http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(col_data[3]) ) {
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
    }
}

const debounceFn = Handsontable.helper.debounce((colIndex, event) => {
    const filtersPlugin = $('#dataTable').data('handsontable').getPlugin('filters');
    filtersPlugin.removeConditions(colIndex);
    filtersPlugin.addCondition(colIndex, 'contains', [event.target.value]);
    filtersPlugin.filter();
}, 100);

function customDropdownRenderer(instance, td, row, col, prop, value, cellProperties) {
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
}


function drawCheckboxInRowHeaders(row, TH) {
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

$(document).ready(function(){
    contact_form.init();
});