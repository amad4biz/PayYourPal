var ProfileView = Backbone.View.extend({
    initialize: function () {
        
    },
    events: {
        "click .send-money":"redirectToSendMoney"
    },
    render: function() {
        $(".profile" ).load( "views/profile.html", function(elm) {
            $('.nav > .active').removeClass('active');
            $('.nav > .profileNav').addClass('active');
            userModel.fetch({
                success: function(response){
                    var user = (response.toJSON());
                    if(user && user.loggedInUser.length){
                        //redirect to profile page
                        $('.loggedInUser').text(user.loggedInUser[0].username);
                    }
                    $(".profile" ).fadeIn(300);
                }
            });

        });
    },
    redirectToSendMoney: function(){
        window.location.hash = '#/sendMoney';
    }
});

var profileView = new ProfileView({
        el: '.profile',
        model: userModel
});