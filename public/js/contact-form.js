var column_property = {
    0 : {
        'class_name' : 'communication_status',
        'name' : 'communication_status',
        'title' : 'Communication Status',
        'source_data' : column_pre_data['eStatus'],
        'type' : 'select'
    },
    1 : {
        'class_name' : 'status_date',
        'name' : 'status_date',
        'title' : 'Status Date',
        'source_data' : '',
        'type' : 'date'
    },
    2 : {
        'class_name' : 'conversation_date',
        'name' : 'conversation_date',
        'title' : 'Recent Converstion Date',
        'source_data' : '',
        'type' : 'date'
    },
    3 : {
        'class_name' : 'discussion_date',
        'name' : 'discussion_date',
        'title' : 'Discussion Date',
        'source_data' : '',
        'type' : 'textarea'
    },
    4 : {
        'class_name' : 'next_steps',
        'name' : 'next_steps',
        'title' : 'Next Steps',
        'source_data' : '',
        'type' : 'text'
    },
    5 : {
        'class_name' : 'next_action_date',
        'name' : 'next_action_date',
        'title' : 'Next Action Date',
        'source_data' : '',
        'type' : 'date'
    },
    6 : {
        'class_name' : 'contact_name',
        'name' : 'contact_name',
        'title' : 'Contact Name',
        'source_data' : '',
        'type' : 'text'
    }
}

var contact_form = {
    init:function(){
        var myTable = $('#contact-form').DataTable( {
            dom: "Bfrtip",
            scrollX: true,
            // responsive: true,
            colReorder: true,
            stateSave:  true,
            "processing": true,
            "serverSide": true,
            "order"     :[],
            "ajax"      :{
                url     :"get_contact",
                type    :"GET",
            },
            createdRow:function(row, data, rowIndex)
            {
                $.each($('td', row), function(colIndex){
                    if(typeof column_property[colIndex] != 'undefined' && column_property[colIndex] != ''){
                        $(this).attr('data-name', column_property[colIndex]['name']);
                        $(this).attr('class', column_property[colIndex]['class_name']);
                        $(this).attr('data-type', column_property[colIndex]['type']);
                        $(this).attr('data-pk', data[0]);
                    }
                });
                // contact_form.intialize_edittable();
            },
            "drawCallback": function( settings,response ) {
                contact_form.intialize_edittable();
                if(settings.json.draw == 1){
                    // contact_form.renderColumnPreData(settings.json.other_data);
                }
            }
        });

    },
    renderColumnPreData :function(pre_data){
        $.each($('#contact-form thead tr th'),function(key,val){
            var input_obj = {
                'title'         : $(val).find('div').text(),
                'source_data'   : pre_data[$(val).attr('data-code')]
            }
            contact_form.intialize_edittable(val,input_obj);
        });
    },
    intialize_edittable:function(){
        $.each(column_property,function(key,val){
            $('#contact-form').editable({
                container:'body',
                selector:'td.'+val['class_name'],
                url:'update_data.php',
                title:val['title'],
                type:'POST',
                datatype:'json',
                source:val['source_data'],
                params: function(params) {
                    params.a = 1;
                    return params;
                },
                validate:function(value){
                    if($.trim(value) == '')
                    {
                        return 'This field is required';
                    }
                },    placement: function (context, source) {
                    var popupWidth = 336;
                    if(($(window).scrollLeft() + popupWidth) > $(source).offset().left){
                      return "right";
                    } else {
                      return "left";
                    }
                  },
              
            });
        });
    }
}

$(document).ready(function(){
    contact_form.init();
});