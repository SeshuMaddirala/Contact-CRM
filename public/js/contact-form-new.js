var column_property =         [
    {
        'class_name' : 'contact_name',
        'name' : 'contact_name',
        'data' : 'contact_name',
        'db_name'       : 'vContactName',
        'db_table'      : 'contacts',
        'title' : 'Contact Name',
        'source_data' : '',
        'type' : 'text'
    },
    {
       
        'class_name' : 'linked_url',
        'name' : 'linked_url',
        'data' : 'linked_url',
        'db_name'       : 'vLinkedURL',
        'db_table'      : 'contacts',
        'title' : 'Contact LinkedIn',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'connection_status',
        'name' : 'connection_status',
        'data' : 'connection_status',
        'db_name'       : 'eConnectionStatus',
        'db_table'      : 'contact_interaction',
        'title' : 'Connection Status',
        'source' : column_pre_data['eConnectionStatus'],
        'type' : 'dropdown'
    },
    {
        'class_name' : 'message_status',
        'name' : 'message_status',
        'data' : 'message_status',
        'db_name'       : 'eMessageStatus',
        'db_table'      : 'contact_interaction',
        'title' : 'Message Status',
        'source' :  column_pre_data['eMessageStatus'],
        'type' : 'dropdown'
    },
    {
        'class_name' : 'message',
        'name' : 'message',
        'data' : 'message',
        'db_name'       : 'tMessage',
        'db_table'      : 'contact_interaction',
        'title' : 'Last Message',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'message_by',
        'name' : 'message_by',
        'data' : 'message_by',
        'db_name'       : 'vMessageBy',
        'db_table'      : 'contact_interaction',
        'title' : 'Message By',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'message_date',
        'name' : 'message_date',
        'data' : 'message_date',
        'db_name'       : 'dMessageDate',
        'db_table'      : 'contact_interaction',
        'title' : 'Message Date',
        'source_data' : '',
        'type' : 'date'
    },
     {
        'class_name' : 'message_time',
        'name' : 'message_time',
        'data' : 'message_time',
        'db_name'       : 'dMessageTime',
        'db_table'      : 'contact_interaction',
        'title' : 'Message Time',
        'source_data' : '',
        'type' : 'time'
    },
    {
        'class_name'    : 'status_date',
        'name'          : 'status_date',
        'data'          : 'status_date',
        'db_name'       : 'dtStatusDate',
        'db_table'      : 'contacts',
        'title'         : 'Status Date',
        'source_data'   : '',
        'type'          : 'date'
    },
    {
        'class_name' : 'conversation_date',
        'name' : 'conversation_date',
        'data' : 'last_conv_date',
        'db_name'       : 'dtLastConversationDate',
        'db_table'      : 'contacts',
        'title' : 'Recent Converstion Date',
        'source_data' : '',
        'type' : 'date'
    },
    {
        'class_name' : 'next_steps',
        'name' : 'next_steps',
        'data' : 'next_steps',
        'db_name'       : 'vNextSteps',
        'db_table'      : 'contacts',
        'title' : 'Next Steps',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'next_action_date',
        'name' : 'next_action_date',
        'data' : 'next_action_date',
        'db_name'       : 'dtNextActionDate',
        'db_table'      : 'contacts',
        'title' : 'Next Action Date',
        'source_data' : '',
        'type' : 'date'
    },
    {
        'class_name'    : 'communication_status',
        'name'          : 'communication_status',
        'data'          : 'communication_status',
        'db_name'       : 'eStatus',
        'db_table'      : 'contacts',
        'title'         : 'Communication Status',
        'source'        : column_pre_data['eStatus'],
        'type'          : 'dropdown'
    },
    {
        'class_name' : 'relationship_status',
        'name' : 'relationship_status',
        'data' : 'relationship_status',
        'db_name'       : 'eRelationshipStatus',
        'db_table'      : 'contacts',
        'title' : 'Relationship Status',
        'source' : column_pre_data['eRelationshipStatus'],
        'type' : 'dropdown'
    },
    {
        'class_name' : 'designation',
        'name' : 'designation',
        'data' : 'designation',
        'db_name'       : 'vDesignation',
        'db_table'      : 'contacts',
        'title' : 'Designation',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'reporting_manager',
        'name' : 'reporting_manager',
        'data' : 'reporting_manager',
        'db_name'       : 'vReportingManager',
        'db_table'      : 'contacts',
        'title' : 'Reporting Manager',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'organization_name',
        'name' : 'organization_name',
        'data' : 'organization_name',
        'db_name'       : 'vName',
        'db_table'      : 'organization',
        'title' : 'Current Company Name',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'website',
        'name' : 'website',
        'data' : 'website',
        'db_name'       : 'vWebsite',
        'db_table'      : 'organization',
        'title' : 'Company Website',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'previous_relationship',
        'name' : 'previous_relationship',
        'data' : 'previous_relationship',
        'db_name'       : 'vPreviousRelationShip',
        'db_table'      : 'contacts',
        'title' : 'Relationship History(Year 2005+)',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'industry',
        'name' : 'industry',
        'data' : 'industry',
        'db_name'       : 'vIndustry',
        'db_table'      : 'organization',
        'title' : 'Industry',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'city',
        'name' : 'city',
        'data' : 'city_name',
        'db_name'       : 'iCityId',
        'db_table'      : 'contacts',
        'title' : 'City',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'state',
        'name' : 'state',
        'data' : 'state_name',
        'db_name'       : 'iStateId',
        'db_table'      : 'contacts',
        'title' : 'State',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'country',
        'name' : 'country',
        'data' : 'country_name',
        'db_name'       : 'iCountryId',
        'db_table'      : 'contacts',
        'title' : 'Country',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'discussion_points',
        'name' : 'discussion_points',
        'data' : 'discussion_points',
        'db_name'       : 'tDiscussionPoints',
        'db_table'      : 'contacts',
        'title' : 'Discussion Points',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'email',
        'name' : 'email',
        'data' : 'email',
        'db_name'       : 'vEmail',
        'db_table'      : 'contacts',
        'title' : 'Email',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'reachout_category',
        'name' : 'reachout_category',
        'data' : 'reachout_category',
        'db_name'       : 'eReachoutCategory',
        'db_table'      : 'contacts',
        'title' : 'Reach-out Category',
        'source' : column_pre_data['eReachoutCategory'],
        'type' : 'dropdown'
    },
    {
        'class_name' : 'work_number',
        'name' : 'work_number',
        'data' : 'work_number',
        'db_name'       : 'vWorkNumber',
        'db_table'      : 'contacts',
        'title' : 'Work Number',
        'source_data' : '',
        'type' : 'numeric'
    },
    {
        'class_name' : 'mobile_number',
        'name' : 'mobile_number',
        'data' : 'mobile_number',
        'db_name'       : 'vMobileNumber',
        'db_table'      : 'contacts',
        'title' : 'Mobile Number',
        'source_data' : '',
        'type' : 'numeric'
    },
    {
        'class_name' : 'category',
        'name' : 'category',
        'data' : 'category',
        'db_name'       : 'eCategory',
        'db_table'      : 'contacts',
        'title' : 'Lead Category',
        'source' : column_pre_data['eCategory'],
        'type' : 'dropdown'
    },
    {
        'class_name' : 'touch_points',
        'name' : 'touch_points',
        'data' : 'touch_points',
        'db_name'       : 'eTouchPoints',
        'db_table'      : 'contacts',
        'title' : 'Touch Points',
        'source' : column_pre_data['eTouchPoints'],
        'type' : 'dropdown',
        'editor': 'select',
        'multiple': true
    },
    {
        'class_name' : 'adaptability',
        'name' : 'adaptability',
        'data' : 'adaptability',
        'db_name'       : 'eAdaptability',
        'db_table'      : 'contacts',
        'title' : 'Adaptability to Change',
        'source' : column_pre_data['eAdaptability'],
        'type' : 'dropdown'
    },
    {
        'class_name' : 'disposition_towards',
        'name' : 'disposition_towards',
        'data' : 'disposition_towards',
        'db_name'       : 'eDispositionTowards',
        'db_table'      : 'contacts',
        'title' : 'Disposition Towards',
        'source' : column_pre_data['eDispositionTowards'],
        'type' : 'dropdown'
    },
    {
        'class_name' : 'coverage',
        'name' : 'coverage',
        'data' : 'coverage',
        'db_name'       : 'eCoverage',
        'db_table'      : 'contacts',
        'title' : 'Coverage',
        'source' : column_pre_data['eCoverage'],
        'type' : 'dropdown'
    },
    {
        'class_name' : 'response',
        'name' : 'response',
        'data' : 'response',
        'db_name'       : 'tResponse',
        'db_table'      : 'contacts',
        'title' : 'Response',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'contact_id',
        'name' : 'contact_id',
        'data' : 'contact_id',
        'db_name'       : 'iContactId',
        'db_table'      : 'contacts',
        'title' : 'Contact',
        'source_data' : '',
        'type' : 'text'
    },
    {
        'class_name' : 'organization_id',
        'name' : 'organization_id',
        'data' : 'organization_id',
        'db_name'       : 'iOrganizationId',
        'db_table'      : 'organization',
        'title'     : 'organization_id',
        'source_data' : '',
        'type' : 'text'
    },{
        'class_name' : 'contact_interaction_id',
        'name' : 'contact_interaction_id',
        'data' : 'contact_interaction_id',
        'db_name'       : 'iContactInteractionId',
        'db_table'      : 'contact_interaction',
        'title'     : 'contact_interaction_id',
        'source_data' : '',
        'type' : 'text'
    }
]
var hot;

var contact_form = {
    init:function(){
        hot = $('#dataTable').handsontable({
            data            : contact_form.getLoadData(),
            columns         : contact_form.getColumns(),
            colHeaders      : true,
            columnSorting   : true,
            // columnSorting   : {
            //     indicator       : true,
            //     sortEmptyCells  : true,
            //     headerAction: false,
            //     initialConfig   : {
            //       column    : 1,
            //       sortOrder : 'asc'
            //     }
            // },
            rowHeaders      : true,
            rowHeights      : 40,
            height          : 300,
            width           : 'auto',
            minSpareRows    : 1,
            fixedColumnsStart: 2,
            licenseKey      : 'non-commercial-and-evaluation',
            customBorders   : true,
            filters         : true,
            dropdownMenu: ['filter_by_condition', 'filter_action_bar'],
            manualRowMove   : true,
            manualColumnMove: true,
            autoWrapRow     : true,
            contextMenu     : ['row_above', 'row_below', 'remove_row'],
            hiddenColumns   : {
                columns: [34,35,36],
                indicators: false
            },
            afterGetColHeader: function(col, TH) {
                contact_form.addInput(col,TH);
            },
            afterGetRowHeader: drawCheckboxInRowHeaders,
            beforeChange: function(obj) {
                // var col_linked_url  = this.getDataAtCell(obj[0][0],1);
                // var org_website     = this.getDataAtCell(obj[0][0],17);
                
                // if(obj[0][1] != "linked_url" && (col_linked_url == '' || col_linked_url == null) ){
                //     setMessage('Please fill Linked URL first and followed by other columns','.panel-heading',false);
                //     return false;
                // }

                // if(obj[0][1] != "website" && (org_website == '' || org_website == null) ){
                //     setMessage('Please fill Company Website first and followed by other columns','.panel-heading',false);
                //     return false;
                // }

                if(obj[0][1] == 'organization_id' || obj[0][1] == 'contact_id' || obj[0][1] == 'contact_interaction_id'){
                    return false;
                }
                
                if(obj[0][3] == '' || obj[0][3] == null){
                    return false;
                }
            },
            afterChange     : function (change, source) {
                if (source === 'loadData') {
                  return; //don't save this change
                }

                console.log(arguments)

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                });

                const col_props = column_property.filter(function(val){   
                    return val.name == change[0][1]; 
                });

                // var where_id = this.getDataAtCell(change[0][0],1);
                // if(col_props[0]['db_table'] == 'organization'){
                //     where_id = this.getDataAtCell(change[0][0],17);
                // }

                change[0][4]    = col_props[0]['db_name'];
                change[0][5]    = col_props[0]['db_table'];
                // change[0][6]    = (change[0][1] == 'linked_url' && (change[0][2] == null || change[0][2] == '' ))?'':where_id;
                change[0][6]    = col_props[0]['type'];
                change[0][7]    = this.getDataAtCell(change[0][0],1);
                change[0][8]    = this.getDataAtCell(change[0][0],17);
                change[0][9]    = this.getDataAtCell(change[0][0],34);
                change[0][10]   = this.getDataAtCell(change[0][0],35);
                change[0][11]   = this.getDataAtCell(change[0][0],36);

                current_row     = this;
                                
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
                        setMessage('Please fill Linked URL first and followed by other columns','.panel-heading',false);
                    },
                    success: function (data) {
                        if(data.success == 1){
                            var currentInstance = $("#dataTable").handsontable('getInstance');
                            if(data.db_table == 'contacts'){
                                currentInstance.setDataAtCell(change[0][0],34,data.insert_id);
                            }else if(data.db_table == 'organization'){
                                currentInstance.setDataAtCell(change[0][0],35,data.insert_id);
                            }else if(data.db_table == 'contact_interaction'){
                                currentInstance.setDataAtCell(change[0][0],36,data.insert_id);                                
                            }

                            setMessage('Column data is updated successfully','.panel-heading',true);
                        }else{
                            setMessage('Error occurred while updating column data','.panel-heading',false);
                        }
                    }
                });
            }, 
            beforeRemoveRow: function(index, amount) {
                return false;
                // var delete_obj = {    
                //     'change[0][9'    = this.getDataAtCell(change[0][0],34);
                //     change[0][10]   = this.getDataAtCell(change[0][0],35);
                //     change[0][11]   = this.getDataAtCell(change[0][0],36);
                // }
    
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                });
    
                $.ajax({
                    url         : "set_remainder",
                    dataType    : "json",
                    type        : "POST",
                    data        : delete_obj,
                    async       : true,
                    success: function (data) {
                        if(data.success == 1){
                            $('.close').trigger('click');
                            setMessage('Reminder has been created successfully','.panel-heading',true);
                        }else{
                            setMessage('Error occurred while creating reminder','.modal-footer',false);
                        }
                    }
                });
            }
        });

        $('#remainder_date_time').datetimepicker({
            format:'d/m/Y H:i:s'
        });            

        $(document).on('click','.save-remainder',function(){
            var save_obj = {
                'remainder_date_time'   : $('#remainder_date_time').val(),
                'notes'                 : $('#message-text').val(),
                'contacts'              : $('#contacts').val(),
                'contacts_name'         : $('#contacts_name').val()
            }

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            });

            $.ajax({
                url         : "set_remainder",
                dataType    : "json",
                type        : "POST",
                data        : save_obj,
                async       : true,
                success: function (data) {
                    if(data.success == 1){
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
        });

        $(document).off('click','.filter-icon');
        $(document).on('click','.filter-icon',function(){
            if($('.filterHeader').hasClass('hide')){
                $('.filterHeader').removeClass('hide');
                $('.filterHeader').show();
            }else{
                $('.filterHeader').addClass('hide');
                $('.filterHeader').hide();    
            }
        });
    },
    getColumns:function(){
        
        var columns_obj = [];
        $.each(column_property, function(i, val){
            if(val.name == 'touch_points'){
                var obj = { 
                    'title': val.title,
                    'editor': "select",
                    // 'width': 150,
                    // 'chosenOptions': {
                    //     'multiple': true,
                    //     'data': val.data
                    // },
                    'selectOptions':val.source,
                    'multiple':true
                    // 'data': val.data
                };
            }else{
                var obj = { 
                    'title': val.title,
                    'type': val.type,
                    'source':val.source,
                    'data': val.data
                };
            }
            columns_obj.push(obj);
        });

        return columns_obj;
    },
    getLoadData:function(){
        $.ajax({
            url: "get_contact",
            dataType: 'json',
            type: 'GET',
            success: function (res) {
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