(function() {
  'use strict';

  angular
  .module('lmp')
  .component('artists', {
    bindings: {
      content: '<',
      type: '<'
    },
    templateUrl: '/views/artists.html'
  });
})();