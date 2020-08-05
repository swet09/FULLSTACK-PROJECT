angular.module('userApp',['appRoutes', 'userController', 'userServices','ngAnimate','mainController','authServices'])
.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
