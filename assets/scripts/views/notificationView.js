var NotificationView = Backbone.View.extend({
    initialize: function () {
        
    },
    events: {
        
    },
    render: function() {
        
    },
    showSuccessNotification: function(text){

        $('.navbar-wrapper').append('<div class="alert" role="alert"></div>');
        $('.alert').fadeIn(300,function(){
                $(this).removeClass('alert-danger');
                $(this).addClass('alert-success').text(text);
                setTimeout(function(){
                    $('.alert').fadeOut(300,function(){
                        $(this).remove();
                    });
                },3000);
        });
    },
    showErrorNotification: function(text){
        $('.navbar-wrapper').append('<div class="alert" role="alert"></div>');
        $('.alert').fadeIn(300,function(){
                $(this).removeClass('alert-success');
                $(this).addClass('alert-danger').text(text);
                setTimeout(function(){
                    $('.alert').fadeOut(300,function(){
                         $(this).remove();
                    });
                },3000);
        });
    }
});

var notificationView = new NotificationView({

});