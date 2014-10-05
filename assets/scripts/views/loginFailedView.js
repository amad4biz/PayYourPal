var LoginFailedView = Backbone.View.extend({
    initialize: function () {
        
    },
    events: {
        
    },
    render: function() {
        $( ".login" ).load( "views/loginFailed.html", function() {
            $(this).show();
            $('.navbar-wrapper div').show();
        });
    }
});

var loginFailedView = new LoginFailedView({

});