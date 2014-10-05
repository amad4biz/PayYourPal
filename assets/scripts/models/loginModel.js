//Setting up backbone for HTTP
Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var LoginModel = Backbone.Model.extend({
    initialize: function(){
        this.on('all',function(e){
            //console.log('all event for login '+this.get('name')+' event '+e);
        });
    },
    defaults: {
        username: 'undefined',
        password: 'undefined',
    },
    urlRoot: "login"
});

var loginModel = new LoginModel();