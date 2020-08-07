angular.module('userServices',[])

.factory('User',function($http){

    userFactory={};

    userFactory.create = function(regData){
        return $http.post('/api/users', regData);
    }

    userFactory.sendMsg = function(formData){
        return $http.post('/api/sendMsg', formData);
    }

    userFactory.hireMsg = function(formData){
        return $http.post('/api/hireMsg', formData);
    }

    return userFactory;

});