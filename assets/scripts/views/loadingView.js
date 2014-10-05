var LoadingView = Backbone.View.extend({
    initialize: function () {
        
    },
    events: {
        
    },
    render: function() {
        
    },
    showLoading: function(text){
        $('body').append('<div class="overlay"></div>');
    },
    hideLoading: function(text){
        $('.overlay').remove();
    }
});

var loadingView = new LoadingView({

});