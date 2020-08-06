angular.module('mainController', ['authServices'])

.controller('mainCtrl',function(Auth, $timeout, $location,$rootScope){
    console.log('main controller');

    var app = this;

    $rootScope.$on('$routeChangeStart',function(){
        if (Auth.isLoggedIn()) {
            Auth.getUser().then(function(data) {
                //console.log(data)
                // Check if the returned user is undefined (expired)
                if (data.data.username === undefined) {
                    Auth.logout(); // Log the user out
                    app.isLoggedIn = false; // Set session to false
                    $location.path('/'); // Redirect to home page
                    app.loadme = false; // Allow loading of page
                }else
                {
                    app.isLoggedIn = true;
                    app.username=data.data.username;
                }
            });
        }
        else
        {
            console.log('not logged in');
        }

    });

    this.doLogin = function(loginData) {
        app.loading = true;
        app.errorMsg=false;
        app.successMsg=false;
        app.loadme = false;
       // console.log(app.loginData);



        Auth.login(app.loginData).then(function(data){
            //console.log(data.data.success);
           //console.log(data.data.token);
            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message+"...Redirecting";
                $timeout(function(){
                    $location.path('/');
                },2000);
                
            }
            else{
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    }

    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        app.isLoggedIn = false;
        app.username="";
        $timeout(function(){
            $location.path('/')
        },2000);
    }

    this.doPay = function(payData){
        console.log("inside doPay method");  
        $location.path('/payment');   
    }

    this.checkStatus = function(){
        console.log("inside checkStatus method");  
        $location.path('/paymentStatus');
    }
     
});