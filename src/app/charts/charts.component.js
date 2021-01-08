(function() {
  'use strict';

  angular
  .module('lmp')
  .component('charts', {
    bindings: {
      content: '<'
    },
    templateUrl: '/views/charts.html'
  });
})();
