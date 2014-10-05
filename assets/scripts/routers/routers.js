var Router = Backbone.Router.extend({
    //Setting up routes
    routes : {
        "*action": "routeResolve"
    },
        renderLoggedInMenu: function(){
        $('.app-content').children('div').hide();
        $('.logout').show();
    },
    routeResolve: function(){
        if(window.location.hash=='#/loginFailed'){
            loginFailedView.render();
        }else{
            userModel.fetch({
                success: function(response){
                    var user = (response.toJSON());
                    if(user && user.loggedInUser.length){
                        //redirect to profile page
                        var page =  window.location.hash;
                        switch(page) {
                            case '#/profile':
                                profileView.render();
                            break;
                            case '#/transactions':
                                transactionsView.render();
                                
                            break;
                            case '#/sendMoney':
                                sendMoneyView.render();
                            break;
                            default:
                                window.location.hash = '#/profile';
                                profileView.render();
                        }
                        router.renderLoggedInMenu();
                    }else{
                        window.location.hash = '#/login';
                        loginView.render();
                    }
                }
            });
        }
    }
});

var router = new Router();
Backbone.history.start();