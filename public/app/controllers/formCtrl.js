
angular.module('formController', ['userServices'])

.controller('formCtrl',function($http, $location, $timeout, $scope, User){
    console.log('form controller')
    var app = this;
    
    
    this.SendMsg = function(formData)
    {
        console.log(app.formData)   
        var number = app.formData.number;
        console.log(number);
        if(number.length()==10)
        {
            
            User.sendMsg(app.formData).then(function(data){
                if(data.data.success){
                    $location.path('/contactStatus');
                    $timeout(function(){
                        $location.path('/')
                    },2000);
                }
                
            });
           
        }
       
        
    }

    this.hiremeMsg = function(hiremeData)
    {
       console.log(app.hiremeData)
        console.log(number);
        User.hireMsg(app.hiremeData).then(function(data){
            if(data.data.success){
                $location.path('/hiremeStatus');
                $timeout(function(){
                    $location.path('/')
                },2000);
            }
           
        });
    }
           
});