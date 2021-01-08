(function() {
  'use strict';

  angular
  .module('lmp')
  .component('lmpPlayer', {
    bindings: {
      track: '=',
    },
    controller: ['$rootScope', '$scope', '$localStorage', 'likeFactory', '$timeout', 'lmpPlayer', function($rootScope, $scope, $localStorage, likeFactory, $timeout, lmpPlayer){
      this.storage = $localStorage;
      this.display = lmpPlayer.display;
      this.layout = $rootScope.layout;

      this.toggle_audio = () => {
        if ($localStorage.state === 'playing') {
          return lmpPlayer.pause();
        }

        if ($localStorage.current) {
          return lmpPlayer.play($localStorage.current);
        }

        if (!$localStorage.current) {
          return lmpPlayer.skip('next');
        }
      };

      this.scrubber = {
        floor: 0,
        ceil: 100,
        hideLimitLabels: true,
        hidePointerLabels: true
      };

      this.on_scrub = $scope.$on('slideEnded', () => {
        lmpPlayer.seek(this.display.width);
      });

      this.toggle_current = () => $timeout(() => {
        $localStorage.view_track = this.storage.current;
      });

      this.skip = (direction) => lmpPlayer.skip(direction);

      $scope.$on('$destroy', () => {
        this.on_scrub();
      });
    }],
    templateUrl: '/views/lmp-player.html'
  });
})();
