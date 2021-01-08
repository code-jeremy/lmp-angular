(function() {
  'use strict';

  angular
  .module('lmp')
  .component('albums', {
    bindings: {
      content: '<'
    },
    templateUrl: '/views/albums.html'
  });
})();
