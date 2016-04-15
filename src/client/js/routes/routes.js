var app = angular.module('myApp', ['ui.bootstrap', 'ngRoute']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html'
    })
    .when('/register', {
      templateUrl: 'templates/signup.html',
      controller: 'registerController'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'loginController'
    })
    .when('/logout', {
    })
    .otherwise({redirectTo: '/login'});



})