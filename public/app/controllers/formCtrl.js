
angular.module('formController', ['userServices'])

.controller('formCtrl',function($http, $location, $timeout, $scope, User){

    var app = this;
    
    
    this.SendMsg = function(formData)
    {  
        User.sendMsg(app.formData).then(function(data){
            if(data.data.success)
            {
                $location.path('/contactStatus');
                $timeout(function(){
                    $location.path('/')
                },2000);
            }
            
        });
       
        
    }

    this.hiremeMsg = function(hiremeData)
    {
        
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