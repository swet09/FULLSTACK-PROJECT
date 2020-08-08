angular.module('userApp',['appRoutes', 'userController', 'userServices','ngAnimate','mainController','authServices', 'cartController','formController','paymentController'])
.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
