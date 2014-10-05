var LoggedInMenuView = Backbone.View.extend({
    initialize: function () {
        
    },
    render: function() {
        $('.navbar-wrapper div').show();
    },
});

var loggedInMenuView = new LoggedInMenuView({
        el: '.navbar-wrapper div'
});