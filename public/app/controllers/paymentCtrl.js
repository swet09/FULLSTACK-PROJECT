angular.module('paymentController', [])

.controller('paymentCtrl',function($location, $timeout){

    var app = this;

    this.checkCard = function(cardData) 
    {
        var errorMsg='';
        const regexName = RegExp('^\s*[a-zA-Z,\s]+\s*$');
        var cvv = app.cardData.cvv.toString();
        var name = app.cardData.name;
        var cardNumber = app.cardData.cardNumber.toString();

       if(!regexName.test(name))
       {
        errorMsg=errorMsg+'Name should contain only charaters aA-zZ';  
       }

       if(cvv.length<3 || cvv.length>3)
       {
        errorMsg=errorMsg+' CVV should of length 3';  
       }

       if(cardNumber.length!==16)
       {
        errorMsg=errorMsg+' cardNumber should be only 16'; 
       }

       app.errorFlag=false;
       if(errorMsg)
       {
            $timeout(function(){
                app.errorFlag=true;
                app.errorMsg = errorMsg;
            },250);
            app.errorFlag=false;
      
       }
       else
       {
            $timeout(function(){
                app.successMsg = 'Card details authenticated.'
                $location.path('/paymentStatus');
            },3000);
       }
    }
});