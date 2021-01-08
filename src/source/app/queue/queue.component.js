(function() {
  'use strict';

  angular
  .module('lmp')
  .component('queue', {
    controller: ['$localStorage', function($localStorage) {
      this.storage = $localStorage;
    }],
    templateUrl: '/views/queue.html'
  });
})();
