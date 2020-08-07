
angular.module('formController', ['userServices'])

.controller('formCtrl',function($http, $location, $timeout, User){
    console.log('form controller')
    var app = this;
    
    this.SendMsg = function(formData)
    {
        console.log(app.formData)
        
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
        
    }
       
    
});