(function() {
  'use strict';

  angular
  .module('lmp')
  .component('reviewOrder', {
    bindings: {
      product: '<'
    },
    templateUrl: '/views/review-order.html'
  });
})();
