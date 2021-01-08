(function() {
  'use strict';

  angular
  .module('lmp')
  .component('artist', {
    bindings: {
      content: '<'
    },
    controller: ['$stateParams', '$localStorage', '$state', '$timeout', 'tracksFactory', function($stateParams, $localStorage, $state, $timeout, tracksFactory) {
      this.view = 'music';

      zenscroll.setup(400, 64);

      this.change_view = (type) => $timeout(() => {
        this.view = type;
        zenscroll.to( document.getElementById('artist-title'));
      });

      this.$onInit = () => {
        tracksFactory.getMusic('all', false, ($stateParams.order || 'newest'), ($stateParams.page || 1), this.content.id).then((res) => {
          $timeout(() => {
            this.tracks = res.content;
            this.page = parseInt(res.page, 10);
            this.pages = parseInt(res.pages, 10);
            $localStorage.queue = [ ...$localStorage.queue, ...res.content ];
          });
        });
      }
    }],
    templateUrl: '/views/artist.html'
  });
})();
