'use strict';

angular.module('deliApp')
  .factory('Tickets',function($resource){
    return $resource('tickets');
  })
  .factory('TicketsAll',function($resource){
    return $resource('tickets/all');
  })
  .controller('deliCtrl', function ($scope, Tickets, TicketsAll) {
    window.tickets = Tickets;
    window.ticketsall = TicketsAll;

    $scope.tickets = Tickets.get();
    $scope.makeTicket = function(){
      Tickets.save({context:'jm'}, function(resp){
        $scope.tickets = Tickets.get();
      });
    };
    $scope.killTickets = function(){
      // TicketsAll.delete();
    };
  })
  .filter('ticketRead',function() {
    return function(ticket) {
      // return ticket;
      ticket = ticket.replace('jm', '');
      ticket = ticket.replace(/^0+/, '');
      return ticket;
    };
  });

