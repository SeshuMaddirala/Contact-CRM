var column_property =         {
    0 : {
        'class_name'    : 'communication_status',
        'name'          : 'communication_status',
        'data'          : 'communication_status',
        'db_name'       : 'eStatus',
        'db_table'      : 'contacts',
        'title'         : 'Communication Status',
        'source_data'   : column_pre_data['eStatus'],
        'type'          : 'select'
    },
    1 : {
        'class_name'    : 'status_date',
        'name'          : 'status_date',
        'data'          : 'status_date',
        'db_name'       : 'dtStatusDate',
        'db_table'      : 'contacts',
        'title'         : 'Status Date',
        'source_data'   : '',
        'type'          : 'datetime'
    },
    2 : {
        'class_name' : 'conversation_date',
        'name' : 'conversation_date',
        'data' : 'last_conv_date',
        'db_name'       : 'dtLastConversationDate',
        'db_table'      : 'contacts',
        'title' : 'Recent Converstion Date',
        'source_data' : '',
        'type' : 'date'
    },
    3 : {
        'class_name' : 'discussion_points',
        'name' : 'discussion_points',
        'data' : 'discussion_points',
        'db_name'       : 'tDiscussionPoints',
        'db_table'      : 'contacts',
        'title' : 'Discussion Points',
        'source_data' : '',
        'type' : 'textarea'
    },
    4 : {
        'class_name' : 'next_steps',
        'name' : 'next_steps',
        'data' : 'next_steps',
        'db_name'       : 'vNextSteps',
        'db_table'      : 'contacts',
        'title' : 'Next Steps',
        'source_data' : '',
        'type' : 'textarea'
    },
    5 : {
        'class_name' : 'next_action_date',
        'name' : 'next_action_date',
        'data' : 'next_action_date',
        'db_name'       : 'dtNextActionDate',
        'db_table'      : 'contacts',
        'title' : 'Next Action Date',
        'source_data' : '',
        'type' : 'date'
    },
    6 : {
        'class_name' : 'contact_name',
        'name' : 'contact_name',
        'data' : 'contact_name',
        'db_name'       : 'vContactName',
        'db_table'      : 'contacts',
        'title' : 'Contact Name',
        'source_data' : '',
        'type' : 'text'
    },
    7 : {
        'class_name' : 'relationship_status',
        'name' : 'relationship_status',
        'data' : 'relationship_status',
        'db_name'       : 'eRelationshipStatus',
        'db_table'      : 'contacts',
        'title' : 'Relationship Status',
        'source_data' : column_pre_data['eRelationshipStatus'],
        'type' : 'select'
    },
    8 : {
        'class_name' : 'designation',
        'name' : 'designation',
        'data' : 'designation',
        'db_name'       : 'vDesignation',
        'db_table'      : 'contacts',
        'title' : 'Designation',
        'source_data' : '',
        'type' : 'text'
    },
    9 : {
        'class_name' : 'reporting_manager',
        'name' : 'reporting_manager',
        'data' : 'reporting_manager',
        'db_name'       : 'vReportingManager',
        'db_table'      : 'contacts',
        'title' : 'Reporting Manager',
        'source_data' : '',
        'type' : 'text'
    },
    10 : {
        'class_name' : 'organization_name',
        'name' : 'organization_name',
        'data' : 'organization_name',
        'db_name'       : 'vName',
        'db_table'      : 'organization',
        'title' : 'Current Company Name',
        'source_data' : '',
        'type' : 'text'
    },
    11 : {
        'class_name' : 'website',
        'name' : 'website',
        'data' : 'website',
        'db_name'       : 'vWebsite',
        'db_table'      : 'organization',
        'title' : 'Company Website',
        'source_data' : '',
        'type' : 'text'
    },
    12 : {
        'class_name' : 'previous_relationship',
        'name' : 'previous_relationship',
        'data' : 'previous_relationship',
        'db_name'       : 'vPreviousRelationShip',
        'db_table'      : 'contacts',
        'title' : 'Relationship History(Year 2005+)',
        'source_data' : '',
        'type' : 'text'
    },
    13 : {
        'class_name' : 'industry',
        'name' : 'industry',
        'data' : 'industry',
        'db_name'       : 'vIndustry',
        'db_table'      : 'organization',
        'title' : 'Industry',
        'source_data' : '',
        'type' : 'text'
    },
    14 : {
        'class_name' : 'city',
        'name' : 'city',
        'data' : 'city_name',
        'db_name'       : 'iCityId',
        'db_table'      : 'contacts',
        'title' : 'City',
        'source_data' : '',
        'type' : 'text'
    },
    15 : {
        'class_name' : 'state',
        'name' : 'state',
        'data' : 'state_name',
        'db_name'       : 'iStateId',
        'db_table'      : 'contacts',
        'title' : 'State',
        'source_data' : '',
        'type' : 'text'
    },
    16 : {
        'class_name' : 'country',
        'name' : 'country',
        'data' : 'country_name',
        'db_name'       : 'iCountryId',
        'db_table'      : 'contacts',
        'title' : 'Country',
        'source_data' : '',
        'type' : 'text'
    },
    17 : {
        'class_name' : 'linked_url',
        'name' : 'linked_url',
        'data' : 'linked_url',
        'db_name'       : 'vLinkedURL',
        'db_table'      : 'contacts',
        'title' : 'Contact LinkedIn',
        'source_data' : '',
        'type' : 'text'
    },
    18 : {
        'class_name' : 'email',
        'name' : 'email',
        'data' : 'email',
        'db_name'       : 'vEmail',
        'db_table'      : 'contacts',
        'title' : 'Email',
        'source_data' : '',
        'type' : 'text'
    },
    19 : {
        'class_name' : 'reachout_category',
        'name' : 'reachout_category',
        'data' : 'reachout_category',
        'db_name'       : 'eReachoutCategory',
        'db_table'      : 'contacts',
        'title' : 'Reach-out Category',
        'source_data' : column_pre_data['eReachoutCategory'],
        'type' : 'select2'
    },
    20 : {
        'class_name' : 'work_number',
        'name' : 'work_number',
        'data' : 'work_number',
        'db_name'       : 'vWorkNumber',
        'db_table'      : 'contacts',
        'title' : 'Work Number',
        'source_data' : '',
        'type' : 'number'
    },
    21 : {
        'class_name' : 'mobile_number',
        'name' : 'mobile_number',
        'data' : 'mobile_number',
        'db_name'       : 'vMobileNumber',
        'db_table'      : 'contacts',
        'title' : 'Mobile Number',
        'source_data' : '',
        'type' : 'number'
    },
    22 : {
        'class_name' : 'category',
        'name' : 'category',
        'data' : 'category',
        'db_name'       : 'eCategory',
        'db_table'      : 'contacts',
        'title' : 'Lead Category',
        'source_data' : column_pre_data['eCategory'],
        'type' : 'select'
    },
    23 : {
        'class_name' : 'touch_points',
        'name' : 'touch_points',
        'data' : 'touch_points',
        'db_name'       : 'eTouchPoints',
        'db_table'      : 'contacts',
        'title' : 'Touch Points',
        'source_data' : column_pre_data['eTouchPoints'],
        'type' : 'select2'
    },
    24 : {
        'class_name' : 'adaptability',
        'name' : 'adaptability',
        'data' : 'adaptability',
        'db_name'       : 'eAdaptability',
        'db_table'      : 'contacts',
        'title' : 'Adaptability to Change',
        'source_data' : column_pre_data['eAdaptability'],
        'type' : 'select'
    },
    25 : {
        'class_name' : 'disposition_towards',
        'name' : 'disposition_towards',
        'data' : 'disposition_towards',
        'db_name'       : 'eDispositionTowards',
        'db_table'      : 'contacts',
        'title' : 'Disposition Towards',
        'source_data' : column_pre_data['eDispositionTowards'],
        'type' : 'select'
    },
    26 : {
        'class_name' : 'coverage',
        'name' : 'coverage',
        'data' : 'coverage',
        'db_name'       : 'eCoverage',
        'db_table'      : 'contacts',
        'title' : 'Coverage',
        'source_data' : column_pre_data['eCoverage'],
        'type' : 'select'
    },
    27 : {
        'class_name' : 'response',
        'name' : 'response',
        'data' : 'response',
        'db_name'       : 'tResponse',
        'db_table'      : 'contacts',
        'title' : 'Response',
        'source_data' : '',
        'type' : 'textarea'
    },
    28 : {
        'class_name' : 'connection_status',
        'name' : 'connection_status',
        'data' : 'connection_status',
        'db_name'       : 'eConnectionStatus',
        'db_table'      : 'contact_interaction',
        'title' : 'Connection Status',
        'source_data' : column_pre_data['eConnectionStatus'],
        'type' : 'select'
    },
    29 : {
        'class_name' : 'message_status',
        'name' : 'message_status',
        'data' : 'message_status',
        'db_name'       : 'eMessageStatus',
        'db_table'      : 'contact_interaction',
        'title' : 'Message Status',
        'source_data' :  column_pre_data['eMessageStatus'],
        'type' : 'select'
    },
    30 : {
        'class_name' : 'message',
        'name' : 'message',
        'data' : 'message',
        'db_name'       : 'tMessage',
        'db_table'      : 'contact_interaction',
        'title' : 'Last Message',
        'source_data' : '',
        'type' : 'textarea'
    },
    31 : {
        'class_name' : 'message_by',
        'name' : 'message_by',
        'data' : 'message_by',
        'db_name'       : 'vMessageBy',
        'db_table'      : 'contact_interaction',
        'title' : 'Message By',
        'source_data' : '',
        'type' : 'text'
    },
    32 : {
        'class_name' : 'message_date',
        'name' : 'message_date',
        'data' : 'message_date',
        'db_name'       : 'dMessageDate',
        'db_table'      : 'contact_interaction',
        'title' : 'Message Date',
        'source_data' : '',
        'type' : 'date'
    },
    33 : {
        'class_name' : 'message_time',
        'name' : 'message_time',
        'data' : 'message_time',
        'db_name'       : 'dMessageTime',
        'db_table'      : 'contact_interaction',
        'title' : 'Message Time',
        'source_data' : '',
        'type' : 'time'
    }
}
var datatable_obj = {};

var contact_form = {
    init:function(){
        // $('#contact-form thead tr')
        // .clone(true)
        // .addClass('filters')
        // .appendTo('#contact-form thead');

        datatable_obj = $('#contact-form').DataTable( {
            dom         : "Bfrtip",
            scrollX     : true,
            // responsive: true,
            colReorder  : true,
            stateSave   :  true,
            "processing": true,
            "serverSide": true,
            "order"     : [],
            "ajax"      :{
                url     :"get_contact",
                type    :"GET",
            },
            columns: contact_form.getColumns(),
            createdRow:function(row, data, rowIndex)
            {
                $.each($('td', row), function(colIndex){
                    if(typeof column_property[colIndex] != 'undefined' && column_property[colIndex] != ''){
                        $(this).attr('data-name', column_property[colIndex]['name']);
                        $(this).attr('class', column_property[colIndex]['class_name']);
                        $(this).attr('data-type', column_property[colIndex]['type']);

                        if(column_property[colIndex]['db_table'] == "organization"){
                            $(this).attr('data-pk', data['organization_id']);
                        }else{
                            $(this).attr('data-pk', data['contact_id']);
                        
                        }
                    }
                });
            },
            // initComplete: function () {
            //     var api = this.api();
     
            //     // For each column
            //     api
            //         .columns()
            //         .eq(0)
            //         .each(function (colIdx) {
            //             // Set the header cell to contain the input element
            //             var cell = $('.filters th').eq(
            //                 $(api.column(colIdx).header()).index()
            //             );
            //             var title = $(cell).text();
            //             $(cell).html('<input type="text" placeholder="' + title + '" />');
     
            //             // On every keypress in this input
            //             $(
            //                 'input',
            //                 $('.filters th').eq($(api.column(colIdx).header()).index())
            //             )
            //                 .off('keyup change')
            //                 .on('change', function (e) {
            //                     // Get the search value
            //                     $(this).attr('title', $(this).val());
            //                     var regexr = '({search})'; //$(this).parents('th').find('select').val();
     
            //                     var cursorPosition = this.selectionStart;
            //                     // Search the column for that value
            //                     api
            //                         .column(colIdx)
            //                         .search(
            //                             this.value != ''
            //                                 ? regexr.replace('{search}', '(((' + this.value + ')))')
            //                                 : '',
            //                             this.value != '',
            //                             this.value == ''
            //                         )
            //                         .draw();
            //                 })
            //                 .on('keyup', function (e) {
            //                     e.stopPropagation();
     
            //                     $(this).trigger('change');
            //                     $(this)
            //                         .focus()[0]
            //                         .setSelectionRange(cursorPosition, cursorPosition);
            //                 });
            //         });
            // },
            // buttons: [
            //     'copy',
            //     'csv',
            //     'excel',
            //     'pdf',
            //     {
            //         extend: 'print',
            //         text: 'Print all (not just selected)',
            //         exportOptions: {
            //             modifier: {
            //                 selected: null
            //             }
            //         }
            //     }
            // ],
            // select: true,
            "drawCallback": function( settings,response ) {
                contact_form.intialize_edittable();
                if(settings.json.draw == 1){
                    // contact_form.renderColumnPreData(settings.json.other_data);
                }
            }
        });


        $(document).on('click','#add_row', function () {
            datatable_obj.row.add({'communication_status':'',
                'status_date':'',
                'last_conv_date':'',
                'discussion_points':'',
                'next_steps':'',
                'next_action_date':'',
                'contact_name':'',
                'relationship_status':'',
                'designation':'',
                'reporting_manager':'',
                'organization_name':'',
                'website':'',
                'previous_relationship':'',
                'industry':'',
                'city_name':'',
                'state_name':'',
                'country_name':'',
                'linked_url':'',
                'email':'',
                'reachout_category':'',
                'work_number':'',
                'mobile_number':'',
                'category':'',
                'touch_points':'',
                'adaptability':'',
                'disposition_towards':'',
                'coverage':'',
                'response':''
            }); 
        });

    },
    // renderColumnPreData :function(pre_data){
    //     $.each($('#contact-form thead tr th'),function(key,val){
    //         var input_obj = {
    //             'title'         : $(val).find('div').text(),
    //             'source_data'   : pre_data[$(val).attr('data-code')]
    //         }
    //         contact_form.intialize_edittable(val,input_obj);
    //     });
    // },
    getColumns:function(){
        
        var columns_obj = [];
        $.each(column_property, function(i, val){
            var obj = { 
                'title': val.title,
                'data': val.data 
            };
            columns_obj.push(obj);
        });

        return columns_obj;
    },
    intialize_edittable:function(){

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        });

        $.each(column_property,function(key,val){
            $('#contact-form').editable({
                container   :'body',
                selector    :'td.'+val['class_name'],
                url         :'update_data',
                title       :val['title'],
                type        :'POST',
                datatype    :'json',
                source      :val['source_data'],
                // anim        : true,
                // autotext    : 'auto',
                // mode        : 'inline' / 'popup',
                select2: {
                    multiple:true,
                    placeholder: 'Please Select '+ val['title']
                },
                params      : function(params) {
                    if(params['name'] == 'touch_points' || params['name'] == 'reachout_category'){
                        params['value'] = params['value'].substring(1);
                    }
                    params.db_name = val.db_name;
                    params.db_table = val.db_table;
                    return params;
                },
                validate    :function(value){
                    if($.trim(value) == '')
                    {
                        return 'This field is required';
                    }
                },  
                placement: function (context, source) {
                    var popupWidth = 336;
                    if(($(window).scrollLeft() + popupWidth) > $(source).offset().left){
                      return "right";
                    } else {
                      return "left";
                    }
                }
            });
        });

        // $('td.touch_points').editable('option', 'select2', {
        //     multiple: true
        //  }); 
    }
}

$(document).ready(function(){
    contact_form.init();
});