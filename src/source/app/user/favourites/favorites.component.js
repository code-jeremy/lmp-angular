(function() {
  'use strict';

  angular
  .module('lmp')
  .component('favorites', {
    bindings: {
      data: '<'
    },
    controller: ['$localStorage', function($localStorage) {
      this.$onInit = () => {
        $localStorage.queue = this.data.content;
      }
    }],
    templateUrl: '/views/favorites.html'
  });
})();
