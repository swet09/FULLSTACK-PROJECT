//controller for card payment check 
angular.module('paymentController', [])

.controller('paymentCtrl',function($location, $timeout){

    var app = this;

    this.checkCard = function(cardData) //call on submit in card validations
    {
        var errorMsg='';
        const regexName = RegExp('^\s*[a-zA-Z,\s]+\s*$'); //regular expression to check name
        var cvv = app.cardData.cvv.toString(); //converting into string to check length
        var name = app.cardData.name;
        var cardNumber = app.cardData.cardNumber.toString();

       if(!regexName.test(name)) //check for name
       {
            errorMsg=errorMsg+'Name should contain only charaters aA-zZ'; 
       }

       if(cvv.length<3 || cvv.length>3) //check for cvv
       {
            errorMsg=errorMsg+' CVV should of length 3';  
       }

       if(cardNumber.length!==16) //check for card number
       {
            errorMsg=errorMsg+' cardNumber should be only 16'; 
       }
       // appending the error messages for userfriendly
       app.errorFlag=false;
       if(errorMsg) // display error
       {
            $timeout(function(){
                app.errorFlag=true;
                app.errorMsg = errorMsg;
            },250);
            app.errorFlag=false;
        }
       else // route to order status
       {
            $timeout(function(){
                app.successFlag=true;
                app.successMsg = 'Card details authenticated.'
                $location.path('/paymentStatus');
            },3000);
        }
    }
});