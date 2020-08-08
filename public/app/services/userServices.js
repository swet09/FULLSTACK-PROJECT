//User Service file to call registeration and auto mail functions 
angular.module('userServices',[])

.factory('User',function($http){

    userFactory={};

    userFactory.create = function(regData) //regData having username, email and password to check and register into DB
    {
        return $http.post('/api/users', regData);
    }

    userFactory.sendMsg = function(formData) //formData having contact us info for automail sending
    {
        return $http.post('/api/sendMsg', formData);
    }

    userFactory.hireMsg = function(formData) //formData having hire me info for automail sending 
    {
        return $http.post('/api/hireMsg', formData);
    }

    return userFactory; //return factory object

});