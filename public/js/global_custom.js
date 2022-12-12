$(window).on('load', function(){
    showLoader();
    fetchReminderCount();
});

function showLoader(){
    $('#preloader').show();
    setTimeout(removeLoader, 1000);
}

function removeLoader(){
    $("#preloader").fadeOut(500, function() {
        $("#preloader").hide();  
    });  
}

function setMessage(msg_txt = '', insert_after = '',success = true){
    var additnl_class = 'alert-success';
    if(!success){
        additnl_class = 'alert-danger';
    }
    var msg_popup_html = '<div class="alert popup-msg alert-dismissible '+additnl_class+' " role="alert">';
    msg_popup_html    += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    msg_popup_html    += '<span aria-hidden="true">&times;</span>';
    msg_popup_html    += '</button>'+msg_txt+'</div>';

    $(msg_popup_html).insertAfter(insert_after);

    setTimeout(function () {
        $('.popup-msg').remove();
    }, 3000);
}

function fetchReminderCount(){
    $.ajax({
        url         : "fetch_reminder_count",
        dataType    : "json",
        type        : "GET",
        async       : true,
        success: function (data) {
            $('.navbar-badge').html(data.total_count);
            if(data.total_count > 0){
                $('.dropdown-header').html(data.total_count+' Reminders');
                $('.cont-remin').html(data.contact_reminder);
                $('.date-remin').html(data.date_reminder);
            }else{
                $('.reminder-section .dropdown-menu').hide();
            }
        }
    });
}

$(document).ready(function(){
    $(document).off('click','.app-logout');
    $(document).on('click','.app-logout',function(){
        if(confirm("Do you want to logout from the application ?")){
            window.location.href = "logout";
        }
    });

    $(document).off('click','.hamburger');
    $(document).on('click','.hamburger',function(){
        if($(this).hasClass('is-active')){
            $(this).removeClass('is-active');
            $('#main-wrapper').removeClass('menu-toggle');
        }else{
            $(this).addClass('is-active');
            $('#main-wrapper').addClass('menu-toggle');
        }
    });
});