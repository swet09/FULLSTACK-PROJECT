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
        templateUrl: 'app/views/pages/hireMe.html',
        controller: 'formCtrl',
        controllerAs: 'form'
    })

    .when('/drinks',{
        templateUrl: 'app/views/pages/drinks.html'
    })

    .when('/tacos',{
        templateUrl: 'app/views/pages/tacos.html'
    })

    .when('/contact',{
        templateUrl: 'app/views/pages/contact.html',
        controller: 'formCtrl',
        controllerAs: 'form'
    })

    .when('/register',{
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
    })

    .when('/placeOrder',{
        templateUrl: 'app/views/pages/placeOrder.html',
        controller: 'cartCtrl',
        controllerAs: 'cart'
    })

    .when('/checkout',{
        templateUrl: 'app/views/pages/checkout.html'
    })

    .when('/payment',{
        templateUrl: 'app/views/pages/checkoutPayment.html',
        controller: 'paymentCtrl',
        controllerAs: 'payment'
    })

   .when('/paymentStatus',{
        templateUrl: 'app/views/pages/checkoutStatus.html'
    })

    .when('/login',{
        templateUrl: 'app/views/pages/users/login.html'
    })

    
    .when('/logout',{
        templateUrl: 'app/views/pages/users/logout.html'
    })

    
    .when('/faq',{
        templateUrl: 'app/views/pages/faq.html'
    })

    .when('/hiremeStatus',{
        templateUrl: 'app/views/pages/hiremeStatus.html'
    }) 

    .when('/contactStatus',{
        templateUrl: 'app/views/pages/contactStatus.html'
    })

    .when('/privacy-policy',{
        templateUrl: 'app/views/pages/privacyPolicy.html'
    })
    
    .when('/terms-of-use',{
        templateUrl: 'app/views/pages/terms.html'
    })

    
    .when('/sweets',{
        templateUrl: 'app/views/pages/sweets.html'
    })

    
    .when('/sides',{
        templateUrl: 'app/views/pages/sides.html'
    })


    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode({ enabled: true, requireBase: false }); 
});

