(function() {
  'use strict';

  angular
  .module('lmp')
  .component('track', {
    bindings: {
      content: '<'
    },
    controller: ['lmpPlayer', '$rootScope', '$localStorage', '$timeout', 'relatedFactory', 'likeFactory', 'authFactory', function(lmpPlayer, $rootScope, $localStorage, $timeout, relatedFactory, likeFactory, authFactory) {
      this.storage = $localStorage;
      this.meta_cols = 3;
      this.description_limit = 180;

      this.$onInit = () => {
        $localStorage.queue = [ this.content ];
        
        if(this.content.buy) this.meta_cols++;
        if(this.content.download) this.meta_cols++;

        relatedFactory.getRelated(this.content.id.replace('track-', '')).then((res) => {
          $timeout(() => {
            this.related = res;
            $localStorage.queue = [ ...$localStorage.queue, ...res ];
          });
        });
      }

      this.toggle_description = () => {
        this.description_limit = this.description_limit === 180 ? 100000 : 180;
      };

      this.add_to_playlist = () => {
        if (!authFactory.isAuthenticated()) {
          return $rootScope.$broadcast('unauthorized', {
            type: 'playlist',
            redirect: window.location.pathname
          });
        }

        $timeout(() => {
          $localStorage.playlist_track = this.content;
        });
      };

      this.like = () => {
        if (!authFactory.isAuthenticated()) {
          return $rootScope.$broadcast('unauthorized', {
            type: 'like',
            redirect: window.location.pathname
          });
        }

        this.like_loading = true;
        
        likeFactory.like(this.content.id.replace('track-', '')).then((res) => {
          if (res) {
            this.content.likes = res.count;
            this.content.user_like = !this.content.user_like;
          }
      
          this.like_loading = false;
        });
      };

      this.toggle_audio = (track_id) => $timeout(() => {
        if ($localStorage.state === 'playing' && $localStorage.current.id === track_id) {
          return lmpPlayer.pause();
        }
      
        lmpPlayer.find_track(track_id);
      });
    }],
    templateUrl: '/views/track.html'
  });
})();
