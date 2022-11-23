
var activities = {
    init:function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        });


        $('input[name="datefilter"]').daterangepicker({
            opens           : 'left',
            drops           : 'auto',
            showDropdowns   : true,
            linkedCalendars : false,
            startDate       : moment().startOf('month'),
            endDate         : moment().endOf('month'),
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
      
        $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
            activities.fetchActivites();
        });
      
        $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });

        activities.fetchActivites();
        
    },
    fetchActivites:function(){
        $.ajax({
            url         : "fetch_activities",
            dataType    : "json",
            data        : {'start_date' : $('input[name="datefilter"]').val().split(" - ")[0],'end_date' : $('input[name="datefilter"]').val().split(" - ")[1]},
            type        : "GET",
            async       : true,
            success: function (data) {
                var print_html = '';
                if(data.length == 0){
                    print_html = `<div class="row no-data-msg">
                        <div class="col-4 text-center" >
                            No data found
                        </div>
                    </div>`;
                }else{
                    $.each(data,function(key,val){
                        $.each(val, function(s_key,s_val){
                            // var extra_class = 'timeline-content right'; 
                            // if(s_key % 2 == 0){
                            //     extra_class = 'timeline-content';
                            // }
                            // print_html += `<div class="timeline">
                            //     <a href="#" class="`+extra_class+`">
                            //         <div class="timeline-step"><span>`+s_val['format_reminder_date']+`</span><small>`+s_val['reminder_time']+`</small></div>
                            //         <p class="description">`+s_val['tDescription']+`</p>
                            //     </a>
                            // </div>`;     
                            print_html += `<div class="tracking-item">
                                <div class="tracking-icon status-intransit"></div>
                                <div class="tracking-date">`+s_val['format_reminder_date']+`<span>`+s_val['reminder_time']+`</span></div>
                                <div class="tracking-content">`+s_val['tTemplate']+`</span></div>
                            </div>`;
                        });
                    });
                }
                // $('.main-timeline').html(print_html);
                $('.tracking-list').html(print_html);
            }
        });
    }
}

$(document).ready(function(){
    activities.init();
});