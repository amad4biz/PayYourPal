var SendMoneyView = Backbone.View.extend({
    template: 'sendMoney',
    initialize: function (options) {
        this.model  = options.model;
        this.model2 = options.model2;
        var date = new Date();
        var transactionDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
        this.model2.attributes['date'] = {
            value: transactionDate
        };
    },
    events: {
        "click .next":"sendMoney",
        "click .clear-form":"clearForm",
        "blur .form-control":"checkValidity",
        "change #currency":"addCurrencyLogo",
        "click .paymentType": "togglePaymentType"
    },
    render: function() {
        $(".sendMoneyForm").html('').css('display','block');
        $('.nav > .active').removeClass('active');
        $('.nav > .sendMoneyNav').addClass('active');
        $(".sendMoneyForm").load( "views/sendMoney.html", function(elm) {
            loadingView.showLoading();
            $(this).fadeIn(300,function(){
                sendMoneyView.renderCurrencyOptions();
                sendMoneyView.renderPaymentTypes();
                loadingView.hideLoading();
            });
        });
        
    },
    renderCurrencyOptions: function(){
        $("#currency").select2({
            placeholder: "Select currency",
            allowClear: true,
            data: this.model.attributes.currencyOptions
        });
    },
    renderPaymentTypes: function(){
        var paymentTypes = this.model.attributes['paymentTypes'];
        var paymentTypesContainer = $('.payment-types');
        var paymentTypeHtml = '';
        for(var paymentType in paymentTypes){
            paymentTypeHtml += '<a href="#"  id="'+paymentTypes[paymentType].id+'" class="list-group-item paymentType">'+paymentTypes[paymentType].text+'</a>';
        }
        paymentTypesContainer.append(paymentTypeHtml);
    },
    togglePaymentType:function(elem){
        var clickedElement = $(elem.currentTarget);
        var currentActiveElem = $(elem.currentTarget).parent('div').children('.active');
        var elemId = clickedElement.attr('id');
        currentActiveElem.removeClass('active');
        clickedElement.addClass('active');
        this.model.attributes['paymentTypes'][elemId].selected = true;
        this.model2.attributes['paymentType'] = {
            value: this.model.attributes['paymentTypes'][elemId].text
        };
        return false;
    },
    sendMoney: function(){
        var isFormValid = this.validateRequiredFields();
        if(isFormValid){
            var date = new Date();
            this.model2.attributes['id'] = {
                value: date.getTime()
            };
            this.model2.attributes['message'] = {
                    value : $('#message').val()
            };
            loadingView.showLoading();
            this.model2.save(null,
                {
                    success: function(response){
                        response = response.toJSON();
                        if(response && response.status == '200'){
                            notificationView.showSuccessNotification('Transaction was added successfully');
                            setTimeout(function(){
                                loadingView.hideLoading();
                                window.location.hash = '#/transactions';
                            },3000);

                        }else{
                            loadingView.hideLoading();
                            notificationView.showErrorNotification('There was a problem . Please try again');
                        }
                    }
                },
                {
                    error: function(){
                        notificationView.showErrorNotification('There was a problem . Please try again');
                    }
                }
                );
        }else{
            notificationView.showErrorNotification('Please fill all required fields');
            return false;
        }
        

    },
    validateRequiredFields:function(){
        var isFormValid = true;
        for (var formItem in this.model.attributes){
            if(this.model.attributes[formItem].required && !this.model.attributes[formItem].value ){
                isFormValid = false;
            }
        }
        if($('#currency').val()==''){
            isFormValid = false;
        }
        return isFormValid;
    },
    validateForm: function(type,value){
        this.model.attributes[type].isValid = false;
        var regEx;
        switch (type){
            case 'email':
                regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.testValue(regEx,value,type);
            break;
            case 'amount':
            value = accounting.unformat(value);
                if(value > 0){
                     this.model.attributes[type].isValid = true;
                }
                //this.testValue(regEx,value,type);
            break;
        }
    },
    testValue: function(regEx,value,type){
        if(regEx.test(value)){
            this.model.attributes[type].isValid = true;
        }
    },
    formatCurrency: function(amount, currency) {
        var formattedAmount = accounting.formatMoney(amount, currency, 2);
        return formattedAmount;
    },
    addCurrencyLogo: function(){
        var currencyOption = $('#currency').val();
        var amount = $('#amount').val();
        var amountText;
         switch (currencyOption){
            case '0':
                amountText = this.formatCurrency(amount,'$');
            break;
            case '1':
                amountText = this.formatCurrency(amount,'€');
            break;
            case '2':
                amountText = this.formatCurrency(amount,'¥');
            break;
            case '3':
                amountText = this.formatCurrency(amount,'£');
            break;
        }
        $('#amount').val(amountText);
        this.setformData();
    },
    checkValidity: function(){
       this.setformData();
        for(var formElement in this.model.attributes){
            if(this.model.attributes[formElement].value && this.model.attributes[formElement].required){
                this.validateForm(formElement,this.model.attributes[formElement].value);
                if(!this.model.attributes[formElement].isValid){
                    $('#'+formElement).parent('div').removeClass('has-success');
                    $('#'+formElement).parent('div').addClass('has-error');
                    $('#'+formElement).siblings('span').show().text(this.model.attributes[formElement].validationMsg);
                    $('#'+formElement).siblings('.icon').removeClass('glyphicon glyphicon-ok');
                    $('#'+formElement).siblings('.icon').addClass(' glyphicon glyphicon-warning-sign ');
                   
                }else{
                    $('#'+formElement).parent('div').removeClass('has-error');
                    $('#'+formElement).parent('div').addClass('has-success');
                    $('#'+formElement).siblings('span').hide();
                    $('#'+formElement).siblings('.icon').removeClass(' glyphicon glyphicon-warning-sign');
                    $('#'+formElement).siblings('.icon').addClass('glyphicon glyphicon-ok ');
                }
            }
        }
    },
    hideValidations: function(){
        for(var formElement in this.model.attributes){
                    $('#'+formElement).parent('div').removeClass('has-success');
                    $('#'+formElement).parent('div').removeClass('has-error');
                    $('#'+formElement).siblings('span').hide();
                    $('#'+formElement).siblings('.icon').removeClass('glyphicon glyphicon-ok');
                    $('#'+formElement).siblings('.icon').removeClass(' glyphicon glyphicon-warning-sign');
        }
    },
    setformData: function(){
        var formElements  = this.$el.find('form .form-control');
        for (var i=0, l=formElements.length; i<l; i++){
            var formElement = $(formElements[i]);
            var formElementId = formElement.attr('id');
            this.model.attributes[formElementId].value = formElement.val();
            this.model2.attributes[formElementId].value = formElement.val();
        }
    },
    clearForm: function(evt){
        var formElements  = this.$el.find('form .form-control');
        for (var i=0, l=formElements.length; i<l; i++){
            var formElement = $(formElements[i]);
            var formElementId = formElement.attr('id');
            formElement.val('');
            this.model.attributes[formElementId].value = '';
        }
        this.hideValidations();
        this.resetCurrencyOptions();
    },
    resetCurrencyOptions: function(){
        $("#currency").select2('data', '');
    }
});

var sendMoneyView = new SendMoneyView({
        el: '.sendMoneyForm',
        model: sendMoneyFormModel,
        model2: transaction
});