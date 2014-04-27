'use strict';

angular.module('deliApp')
  .factory('Tickets',function($resource){
    return $resource('tickets');
  })
  .controller('deliCtrl', function ($scope, Tickets) {
    window.tickets = Tickets;
    $scope.tickets = Tickets.get();
    $scope.makeTicket = function(){
      Tickets.save({context:'jm'}, function(resp){
        $scope.tickets = Tickets.get();
      });

    };
  });