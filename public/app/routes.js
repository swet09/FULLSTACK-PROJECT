angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider, $locationProvider){

    $routeProvider
    
    .when('/',{
        templateUrl: 'app/views/pages/home.html'
    })

    .when('/about',{
        templateUrl: 'app/views/pages/about.html'
    })

    .when('/menu',{
        templateUrl: 'app/views/pages/menu.html'
    })

    .when('/hireMe',{
        templateUrl: 'app/views/pages/hireMe.html'
    })

    .when('/drinks',{
        templateUrl: 'app/views/pages/drinks.html'
    })

    .when('/tacos',{
        templateUrl: 'app/views/pages/tacos.html'
    })

    .when('/contact',{
        templateUrl: 'app/views/pages/contact.html'
    })

    .when('/register',{
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
    })

    .when('/login',{
        templateUrl: 'app/views/pages/users/login.html'
    })

    
    .when('/logout',{
        templateUrl: 'app/views/pages/users/logout.html'
    })

    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode({ enabled: true, requireBase: false }); 
});

