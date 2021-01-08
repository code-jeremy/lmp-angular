(function() {
  'use strict';

  angular
  .module('lmp')
  .component('orders', {
    bindings: {
      list: '<'
    },
    controller: ['$location', function($location) {
      if ($location.search()['paypal-return']) {
        this.message = `<p>There was a problem processing your order. Order was not found or invalid. Please contact iamlmp.</p>`;
      }
    }],
    templateUrl: '/views/orders.html'
  });
})();
