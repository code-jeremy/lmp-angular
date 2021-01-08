(function() {
  'use strict';

  angular
  .module('lmp')
  .component('userPlaylists', {
    bindings: {
      playlists: '<'
    },
    templateUrl: '/views/user-playlists.html'
  });
})();
