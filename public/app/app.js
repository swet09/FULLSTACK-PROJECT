angular.module('userApp',['appRoutes', 'userController', 'userServices','ngAnimate','mainController','authServices', 'cartController','formController','paymentController']) //inject all controllers and services
.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors'); //token in header
});
