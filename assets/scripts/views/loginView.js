var LoginView = Backbone.View.extend({
    initialize: function () {
        
    },
    events: {
        "click button":"login"
    },
    render: function() {
        $('.container').children('div').hide();
        $('.logout').hide();
        $( ".login" ).load( "views/login.html", function() {
            $(this).show();
            $('.navbar-wrapper div').show();
        });
    },
    login: function(){
        //login event handler
        var formElements = $(this.el).children();
        this.model.attributes.username = $('#username').val();
        this.model.attributes.password = $('#password').val();
        this.model.attributes.logout = false;
        this.model.save(null,
            {
                success: function(model, response){
                    if(response && response.page){
                        window.location.hash = response.page;
                        if(response.page !='/loginFailed'){
                            profileView.render();
                        }
                    }
                }
            }
        );
    }
});

var loginView = new LoginView({
        el: '.login',
        model: loginModel,
        model2: userModel
});