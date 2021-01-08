(function() {
  'use strict';

  angular
  .module('lmp')
  .component('checkout', {
    bindings: {
      order: '<'
    },
    controller: ['cancelSubFactory', '$state', '$timeout', function(cancelSubFactory, $state, $timeout) {
      this.cancel = () => {
        cancelSubFactory.cancel(this.order.order_id).then(res => $timeout(() => {
          $state.go('user-orders', {orderId: this.order.order_id})
        }));
      }
    }],
    templateUrl: '/views/checkout.html'
  });
})();
