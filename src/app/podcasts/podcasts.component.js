(function() {
  'use strict';

  angular
  .module('lmp')
  .component('podcasts', {
    bindings: {
      songs: '<'
    },
    controller: ['$rootScope', '$localStorage', 'metaService', '$uiRouterGlobals', function($rootScope, $localStorage, metaService, $uiRouterGlobals ) {
      this.$onInit = () => {
        $localStorage.queue = [ ...$localStorage.queue, ...this.songs.content ];
      }
    }],
    templateUrl: '/views/podcasts.html'
  });
})();
