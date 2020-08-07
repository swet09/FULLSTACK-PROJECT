
angular.module('formController', ['userServices'])

.controller('formCtrl',function($http, $location, $timeout, User){
    console.log('form controller')
    var app = this;
    
    this.SendMsg = function(formData)
    {
        console.log(' contact data '+JSON.stringify(formData)+' '+app.formData.name)
        if(app.formData.name==''|| app.formData.name==null||app.formData.email==''|| app.formData.email==null||app.formData.message==''|| app.formData.message==null)
        {
            $timeout(function(){
                app.errorMsg ="Please fill the below fields and send us your message."
            },2000);
        }
        else
        {
            
            user.sendMsg(app.formData).then(function(data){
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
        console.log(' hire me data '+JSON.stringify(hiremeData)+' '+app.hiremeData.name)
        if(app.hiremeData.name==''|| app.hiremeData.name==null||app.hiremeData.email==''|| app.hiremeData.email==null||app.hiremeData.message==''|| app.hiremeData.message==null)
        {
            $timeout(function(){
                app.errorMsg ="Please fill the below fields and send us your message."
            },2000);
        }
        else
        {
            user.hireMsg(app.hiremeData).then(function(data){
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