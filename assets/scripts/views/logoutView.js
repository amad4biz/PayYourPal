var LogoutView = Backbone.View.extend({
    initialize: function () {
        
    },
    events: {
        "click .logout":"logout"
    },
    render: function() {

    },
    logout: function(){
        //logout event handler
        this.model.save({logout:true});
        window.location.hash = '';
    }
});

var logoutView = new LogoutView({
        el: '.navbar-wrapper',
        model: loginModel,
        model2: userModel
});