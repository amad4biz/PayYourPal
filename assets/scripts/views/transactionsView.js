var TransacionsView = Backbone.View.extend({
    initialize: function (options) {
        this.model = options.model;
        this.model2 = options.model2;
    },
    events: {
        "click .transaction":"fetchTransactionData"
    },
    render: function() {
        $(".transactions").load( "views/transactions.html", function(elm) {
            $('.nav > .active').removeClass('active');
            $('.nav > .transactionsNav').addClass('active');
            loadingView.showLoading();
            transactions.fetch({
                success: function(response){
                    var transactions = response.toJSON()[0];
                    //Removing default model values
                    delete transactions.amount;
                    delete transactions.date;
                    delete transactions.email;
                    delete transactions.id;
                    delete transactions.message;
                    delete transactions.paymentType;

                    var transaction_rows = '';
                    if(transactions){
                        for(var item in transactions){
                            if(item && !$.isEmptyObject(transactions[item])){
                                var email = transactions[item].email.value;
                                var transactionDate = transactions[item].date.value;
                                var amount = transactions[item].amount.value;
                                if(email && transactionDate && amount){
                                     transaction_rows += '<tr class="transaction" id="'+item+'"><td class="email">'+email+'</td><td class="amount">'+amount+'</td><td>'+transactionDate+'</td></tr>';
                                }
                            }
                        }

                    }else{
                        transaction_rows = 'No transactions';
                    }
                    $(".transactions tbody").html(transaction_rows);
                    $(".transactions").fadeIn(300,function(){
                        loadingView.hideLoading();
                    });

                },
                error: function(){
                    $(".transactions tbody").html('<p class="bg-danger">Could Not load Transactions at this time</p>');
                }
            });
        });
    },
    fetchTransactionData: function(elem){
        var transactionId = $(elem.currentTarget).attr('id');
        this.model2.CurrentTransactionId = $(elem.currentTarget).attr('id');
            transaction.fetch({
                data: {
                    Id : transactionId
                },
                success: function(response){
                    var transactionDataObj = response.toJSON();
                    $('#'+transaction.CurrentTransactionId).html('');

                    var transaction_row = '<td class="email" >'+transactionDataObj.email.value+'</td><td class="amount">'+transactionDataObj.amount.value+'</td><td>'+transactionDataObj.date.value+'</td>';
                    $('#'+transaction.CurrentTransactionId).html(transaction_row);

                    transactionDataObj.message.value = ' <i><p>'+ transactionDataObj.message.value +'</p></i> ';
                    $('#'+transaction.CurrentTransactionId+' .email').append(transactionDataObj.message.value);

                    transactionDataObj.paymentType.value = ' <i><p>'+ transactionDataObj.paymentType.value+ '</p></i>';
                    $('#'+transaction.CurrentTransactionId+' .amount').append(transactionDataObj.paymentType.value);
                    $('#'+transaction.CurrentTransactionId).addClass('expanded');

                },
                error: function(){
                        $(".transactions tbody").html('<p class="bg-danger">Could Not load Transactions at this time</p>');
                }
            });

    }
});

var transactionsView = new TransacionsView({
        el: '.transactions',
        model: transactions,
        model2: transaction
});