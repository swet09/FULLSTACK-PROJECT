angular.module('userApp',['appRoutes', 'userController', 'userServices','ngAnimate','mainController','authServices', 'cartController'])
.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
