(function() {
  'use strict';

  angular
  .module('lmp')
  .component('chart', {
    bindings: {
      content: '<'
    },
    controller: ['$localStorage', function($localStorage) {
      this.$onInit = () => {
        if (this.content.tracks.length > 0) {
          $localStorage.queue = [ ...$localStorage.queue, ...this.content.tracks ];
        }
      }
    }],
    templateUrl: '/views/chart.html'
  });
})();
