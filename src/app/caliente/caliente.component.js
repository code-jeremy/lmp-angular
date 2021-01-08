(function() {
  'use strict';

  angular
  .module('lmp')
  .component('caliente', {
    bindings: {
      tracks: '<',
      layout: '<'
    },
    controller: ['calienteFactory', '$scope', '$localStorage', function(calienteFactory, $scope, $localStorage) {
      this.$onInit = () => {
        if (this.tracks) {
          return this.content = this.tracks;
        }

        calienteFactory.getContent().then(res => {
          this.content = res;
          
          if (!$localStorage.queue) {
            $localStorage.queue = this.content;
          } else {
            $localStorage.queue = [ ...$localStorage.queue, ...res ];
          }
        });
      }
    }],
    templateUrl: '/views/caliente.html' 
  });
})();
