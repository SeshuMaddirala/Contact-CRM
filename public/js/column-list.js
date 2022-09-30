var column_list = {
    init:function(){
        
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        });
        column_list.domAction();
    },
    domAction:function(){
        $(document).on('change','.type',function(){
            if($(this).val() == 'dropdown'){
                $(this).parents('tr').find('.data_source').removeClass('hide').addClass('show');

            }else{
                $(this).parents('tr').find('.data_source').removeClass('show').addClass('hide');
            }
        });

        $(document).off('click','.add-column-btn').on('click','.add-column-btn',function(){
            $('.column-list-div table tbody').append($('.column-list-div table tbody tr:first').clone());
        });

        $(document).off('save-column-list','.save-column-list').on('click','.save-column-list',function(){
            var column_data = [];
            $.each($('.column-list-div table tbody tr'),function(key,val){
                var column_obj = {};
                var column_obj = {
                    'display_name'  : $(val).find('.display_name').val(),
                    'type'          : $(val).find('.type').val(),
                    'data_source'   : $(val).find('.data_source').val(),
                    'db_alias_name' : $(val).find('.db_alias_name').val(),
                    'sequence'      : $(val).find('.sequence').val(),
                    'hide_column'   : $(val).find('.hide_column').is(":checked"),
                    'validate'      : $(val).find('.validate').is(":checked")
                }
                column_data.push(column_obj);
            });
            $.ajax({
                url         :'add_update_column',
                type        :"post",
                dataType    :"json",
                data        : {'column_data' : column_data},
                async       : true,
                success:function(){
                    setMessage('Colum data has been modified successfully','.panel-heading',true);
                }
            });
        });
    }
}

column_list.init();