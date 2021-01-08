(function() {
  'use strict';

  angular
  .module('lmp')
  .component('featuredContent', {
    bindings: {
      content: '<'
    },
    controller: ['featuredFactory', '$scope', '$localStorage', 'lmpPlayer', function(featuredFactory, $scope, $localStorage, lmpPlayer) {
      this.tracks = [];

      this.advert_click = () => $window.ga('send', 'event', 'Advert', 'Click', item.content.url );

      this.toggle_audio = (track_id) => {
        if ($localStorage.state === 'playing' && $localStorage.current.id === track_id) {
          return lmpPlayer.pause();
        }
        
        lmpPlayer.find_track(track_id);
      };

      this.$onInit = () => {
        if (!this.content) {
          featuredFactory.getContent().then(res => {
            this.content = res;
        
            for (let i = 0; i < res.length; i += 1) {
              if (res[i].type === 'music') {
                this.tracks.push(res[i].content);
              }
            }
        
            if (this.tracks.length > 0) {
              if (!$localStorage.queue) {
                $localStorage.queue = this.tracks;
              } else {
                $localStorage.queue = [ ...$localStorage.queue, ...this.tracks ];
              }
            }
          });
        }
      }
    }],
    templateUrl: '/views/featured.html'
  });
})();
