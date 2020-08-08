//form controller for hire me and contact us 
angular.module('formController', ['userServices'])

.controller('formCtrl',function($http, $location, $timeout, $scope, User){

    var app = this;
    
    this.SendMsg = function(formData)//contact us submit calls this function
    {  
        User.sendMsg(app.formData).then(function(data)//auto mail sending service request
        {
            if(data.data.success)
            {
                $location.path('/contactStatus'); //routing to the message 
                $timeout(function(){
                    $location.path('/')//and then to home page
                },2000);
            }
        });
    }

    this.hiremeMsg = function(hiremeData)//hire me submit calls this function
    {
        
        User.hireMsg(app.hiremeData).then(function(data)//auto mail sending service request
        {
            if(data.data.success)
            {
                $location.path('/hiremeStatus');//routing to the message
                $timeout(function(){
                    $location.path('/')//and then to home page
                },2000);
            }
        });
    }
           
});