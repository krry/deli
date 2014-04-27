'use strict';

angular.module('deliApp')
  .factory('Tickets',function($resource){
    return $resource('tickets');
  })
  .controller('deliCtrl', function ($scope, Ticket) {
    window.tickets = Tickets;
    $scope.tickets = Tickets.query();
    $scope.ticket = Tickets.get();
  });