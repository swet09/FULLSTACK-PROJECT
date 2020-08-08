var loginData={
    username:'',
    password:''
};

angular.module('mainController', ['authServices'])

.controller('mainCtrl',function(Auth, $timeout, $location,$rootScope){

    var app = this;
    

    $rootScope.$on('$routeChangeStart',function()
    {
        if (Auth.isLoggedIn()) {
            Auth.getUser().then(function(data) {
               
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
       
    });

    this.doLogin = function(loginData) 
    {
        app.loading = true;
        app.errorMsg=false;
        app.successMsg=false;
        app.loadme = false;
        app.successFlag = false;
        app.errorFlag = false;

        Auth.login(app.loginData).then(function(data){
            if(data.data.success){
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
            else
            {
                app.errorFlag = true;
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    }

    this.logout = function()
    {
        Auth.logout();
        $location.path('/logout');
        app.isLoggedIn = false;
        app.username="";
        $timeout(function(){
            $location.path('/')
        },2000);
    }

    this.doPay = function(payData)
    {  
        $location.path('/payment');   
    }

    this.checkStatus = function()
    {
        $location.path('/paymentStatus');
    }
    
    app.loginData=loginData;
});