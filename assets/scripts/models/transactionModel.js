//Setting up backbone for HTTP
Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var Transaction = Backbone.Model.extend({
    initialize: function(){
        //console.log('person initialized');
        this.on('all',function(e){
            //console.log('all event for person '+this.get('name')+' event '+e);
        });
    },
    defaults: {
        email:{},
        amount:{},
        date:{},
        message:{},
        paymentType:{}
    },
    urlRoot: "transaction",
    url: function(){
         var base = this.urlRoot || (this.collection && this.collection.url) || "/";
         return base;
    }
    
});

var transaction = new Transaction();

var Transactions = Backbone.Collection.extend({
    initialize: function(){
        this.on('all',function(e){

        });
    },
    model: Transaction,
    urlRoot: "transactions",
    url: function(){
         var base = this.urlRoot || (this.collection && this.collection.url) || "/";
         return base;
    }
});

var transactions = new Transactions();