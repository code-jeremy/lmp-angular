(function() {
  'use strict';

  angular
  .module('lmp')
  .component('podcastVideo', {
    bindings: {
      video: '='
    },
    controller: ['$scope', '$element', 'likeFactory', 'lmpPlayer', function($scope, $element, likeFactory, lmpPlayer) {
      this.$onInit = () => {
        $element[0].firstElementChild.firstElementChild.addEventListener('playing', this.stop_audio);
        $element[0].firstElementChild.firstElementChild.addEventListener('durationchange', this.duration_update);
      }

      this.stop_audio = () => lmpPlayer.pause();  

      this.like = () => {
        likeFactory.like(this.track.id.replace('track-', '')).then(res => {
          if (res) {
            this.track.likes = res.count;
          }
        });
      };
    }],
    templateUrl: 'podcast-video.html'	
  });
})();
