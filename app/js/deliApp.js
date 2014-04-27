'use strict';

angular.module('deliApp', [
  'ngResource',
  'ngRoute'
  ])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'js/views/main',
    controller: 'deliCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}); 
// $locationProvider.html5Mode(true);