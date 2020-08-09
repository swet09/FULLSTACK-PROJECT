//controller for login authentication and check token where user is logged in or not

var loginData={
    username:'',
    password:''
};

angular.module('mainController', ['authServices'])//authservice for authentication and token validation

.controller('mainCtrl',function(Auth, $timeout, $location,$rootScope){

    var app = this;
    
    $rootScope.$on('$routeChangeStart',function()//is logged in function token validation
    {
        if (Auth.isLoggedIn()) 
        {
            Auth.getUser().then(function(data) 
            {
               
                if (data.data.username === undefined) 
                {
                    Auth.logout(); // Log the user out
                    app.isLoggedIn = false; // Set session to false
                    $location.path('/'); // Redirect to home page
                    app.loadme = false; // Allow loading of page
                }
                else
                {
                    app.isLoggedIn = true;
                    app.username=data.data.username;
                }
            });
        }   
    });

    this.doLogin = function(loginData) //authentication function login call 
    {
        app.loading = true;
        app.errorMsg=false;
        app.successMsg=false;
        app.loadme = false;
        app.successFlag = false;
        app.errorFlag = false;

        Auth.login(app.loginData).then(function(data)
        {
            if(data.data.success)//if success redirect to home page 
            {
                app.loading = false;
                app.successFlag = true;
                app.successMsg = data.data.message+"...Redirecting";
                $timeout(function(){
                    $location.path('/');
                    app.successFlag = false;
                    app.loginData.username='';
                    app.loginData.password='';
                },2000);
            }
            else //else display error
            {
                app.errorFlag = true;
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    }

    this.logout = function() //log out -> kill token set flag variable to false
    {
        Auth.logout();
        $location.path('/logout');
        app.isLoggedIn = false;
        app.username="";
        $timeout(function(){
            $location.path('/')
        },2000);
    }

    /**
     * route to payment page, credit cart details.
     * @param payData 
     */
    this.doPay = function(payData)
    {  
        $location.path('/payment');   
    }

    /**
     * This is the route to final page that displays status of the order
     */
    this.checkStatus = function()
    {
        $location.path('/paymentStatus');
    }
    
    app.loginData=loginData; //clearing data
});