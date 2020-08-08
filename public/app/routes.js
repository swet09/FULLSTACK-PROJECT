//routes configuration front end
angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider, $locationProvider){

    //angular route handler
    $routeProvider
    
    .when('/',{ //route for home
        templateUrl: 'app/views/pages/home.html'
    })

    .when('/about',{ //route for about us
        templateUrl: 'app/views/pages/about.html'
    })

    .when('/menu',{ //route for menu
        templateUrl: 'app/views/pages/menu.html'
        
    })

    .when('/hireMe',{ //route for hire me
        templateUrl: 'app/views/pages/hire_me.html',
        controller: 'formCtrl',
        controllerAs: 'form'
    })

    .when('/drinks',{ //route for drinks
        templateUrl: 'app/views/pages/drinks.html'
    })

    .when('/tacos',{ //route for tacos
        templateUrl: 'app/views/pages/tacos.html'
    })

    .when('/contact',{ //route for contact us
        templateUrl: 'app/views/pages/contact.html',
        controller: 'formCtrl',
        controllerAs: 'form'
    })

    .when('/register',{ //route for register
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
    })

    .when('/placeOrder',{ //route for place order
        templateUrl: 'app/views/pages/placeOrder.html',
        controller: 'cartCtrl',
        controllerAs: 'cart'
    })

    .when('/checkout',{ //route for checkout
        templateUrl: 'app/views/pages/checkout.html'
    })

    .when('/payment',{ //route for payment
        templateUrl: 'app/views/pages/checkoutPayment.html',
        controller: 'paymentCtrl',
        controllerAs: 'payment'
    })

   .when('/paymentStatus',{ //route for payment status
        templateUrl: 'app/views/pages/checkoutStatus.html'
    })

    .when('/login',{ //route for login
        templateUrl: 'app/views/pages/users/login.html'
    })

    
    .when('/logout',{ //route for logout
        templateUrl: 'app/views/pages/users/logout.html'
    })

    
    .when('/faq',{ //route for FAQ
        templateUrl: 'app/views/pages/faq.html'
    })

    .when('/hiremeStatus',{ //route for hire me status
        templateUrl: 'app/views/pages/hiremeStatus.html'
    }) 

    .when('/contactStatus',{ //route for contact status 
        templateUrl: 'app/views/pages/contactStatus.html'
    })

    .when('/privacy-policy',{ //route for privacy policy
        templateUrl: 'app/views/pages/privacyPolicy.html'
    })
    
    .when('/terms-of-use',{ //route for terms of use
        templateUrl: 'app/views/pages/terms.html'
    })

    
    .when('/sweets',{ //route for sweets
        templateUrl: 'app/views/pages/sweets.html'
    })

    
    .when('/sides',{ //route for sides
        templateUrl: 'app/views/pages/sides.html'
    })


    //anything else route to home page
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode({ enabled: true, requireBase: false }); 
});

