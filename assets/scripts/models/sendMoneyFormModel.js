//Setting up backbone for HTTP
Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var SendMoneyFormModel = Backbone.Model.extend({
    initialize: function(){
        this.on('all',function(e){
            //console.log('all event for login '+this.get('name')+' event '+e);
        });
    },
    defaults: {
        date:'',
        isFormValid: false,
        email: {
            required: true,
            value: '',
            isValid: false,
            validationMsg: 'Please enter a valid email address'
        },
        amount: {
            required: true,
            value: '',
            isValid: false,
            validationMsg: 'Please enter a valid amount. Amount should be a positive number'
        },
        message: {
            required: false,
            value: ''
        },
        currencyOptions:[
            {
                id: '0',
                text: 'USD'
            },
            {
                id: '1',
                text: 'EUR'
            },
            {
                id: '2',
                text: 'JYP'
            },
            {
                id: '3',
                text: 'GBP'
            }
        ],
        paymentTypes: {
            0: {
                id: 0,
                text: 'I am sending money to family and friends.',
                selected: false
            },
            1:{
                id: 1,
                text: 'I am paying back money I owe.',
                selected: false
            },
            2: {
                id: 2,
                text: 'I am paying my share of the bill.',
                selected: false
            },
            3: {
                id: 3,
                text: 'I am paying for goods and services.',
                selected: false
            }
        }
    }
});

var sendMoneyFormModel = new SendMoneyFormModel();
