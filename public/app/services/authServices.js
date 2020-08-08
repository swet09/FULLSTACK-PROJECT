//Authentication service for user and token management
angular.module('authServices',[])

.factory('Auth',function($http,AuthToken)
{
    //call to check user login credentials
    authFactory={};
    authFactory.login = function(loginData) 
    {
        return $http.post('/api/authenticate', loginData).then(function(data) {
            AuthToken.setToken(data.data.token); // Endpoint will return a token to set
            return data;
        });
    };

    //function called repeated to check if token is there or not 
    authFactory.isLoggedIn = function() 
    {
        if (AuthToken.getToken()) 
        {
            return true; 
        } 
        else 
        {
           return false; 
        }
    };

     // Function to get current user's data
    authFactory.getUser = function() 
    {
        // Check first if user has a token
        if (AuthToken.getToken()) 
        {
            return $http.post('/api/me'); // Return user's data
        }
        else 
        {
            $q.reject({ message: 'User has no token' }); // Reject if no token exists
        }
    };

    // Function to logout the user
    authFactory.logout = function() {
        AuthToken.setToken(); // Remove token from local storage
    };

    return authFactory; // return factory object

})

//for token get set operations factory
.factory('AuthToken', function($window) 
{
    var authTokenFactory = {}; 

    authTokenFactory.setToken = function(token) 
    {
        
        if (token) 
        {
            $window.localStorage.setItem('token', token);  //set token in local storage
        } 
        else 
        {
            $window.localStorage.removeItem('token'); //remove token in local storage
        }
    };

    authTokenFactory.getToken = function() 
    {
        return $window.localStorage.getItem('token');
    };

    return authTokenFactory; // return factory object
})

// Factory: AuthInterceptors is used to configure headers with token (passed into config, app.js file)
.factory('AuthInterceptors', function(AuthToken) 
{
    var authInterceptorsFactory = {}; 

    // check for token in local storage and attach to header
    authInterceptorsFactory.request = function(config) 
    {
       
        var token = AuthToken.getToken(); // check if a token in local storage
       
        if (token) config.headers['x-access-token'] = token; //attach to headers if exists

        return config; // return config object for app.js
    };

    return authInterceptorsFactory; // return factory object

});