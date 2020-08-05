angular.module('authServices',[])

.factory('Auth',function($http){

    authFactory={};
    console.log('testing auth services');

    authFactory.login = function(regData){
        return $http.post('/api/authenticate', regData);
    }

    return authFactory;

})