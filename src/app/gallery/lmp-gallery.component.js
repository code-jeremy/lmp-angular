(function() {
  'use strict';

  angular
  .module('lmp')
  .component('lmpGallery', {
    bindings: {
      source: '<'
    },
    controller: ['$timeout', function($timeout) {
      this.modal = false;

      this.open = (index) => $timeout(() => {
        this.modal = true;
        this.active = index + 1;
      });

      this.nav = (dir) => $timeout(() => {
        switch (dir) {
          case 'next':
            this.active = (this.active + 1) > (this.source.images.length - 1) ? 0 : this.active + 1;
            break;
          case 'prev' :
            this.active = (this.active - 1) < 0 ? (this.source.images.length - 1) : this.active - 1;
            break;
        }
      });

      this.close = () => $timeout(() => {
        this.modal = false;
        this.active = null;
      });
    }],
    templateUrl: '/views/gallery.html'
  });
})();
