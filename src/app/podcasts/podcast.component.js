(function() {
  'use strict';

  angular
  .module('lmp')
  .component('podcast', {
    bindings: {
      content: '<'
    },
    controller: ['lmpPlayer', '$rootScope', '$localStorage', '$timeout', 'relatedFactory', 'likeFactory', 'authFactory', function(lmpPlayer, $rootScope, $localStorage, $timeout, relatedFactory, likeFactory, authFactory) {
      this.meta_cols = 3;
      this.description_limit = 180;

      this.$onInit = () => {
        $localStorage.queue = [ this.content ];
        
        if (this.content.buy) this.meta_cols += 1;
        if (this.content.download) this.meta_cols += 1;

        relatedFactory.getRelated(this.content.id.replace('track-', '')).then(res => {
          $timeout(() => {
            this.related = res;
            $localStorage.queue = [ ...$localStorage.queue, ...res ];
          });
        });
        
        if (this.content.video) {
          this.video = document.getElementById('podcast-video-' + this.content.id);
          
          if (this.video) {
            this.video.addEventListener('playing', this.stop_audio);
          } 
        }
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

        $timeout(() => $localStorage.playlist_track = content);
      };

      this.like = () => {
        if (!authFactory.isAuthenticated()) {
          return $rootScope.$broadcast('unauthorized', {
            type: 'like',
            redirect: window.location.pathname
          });
        }

        this.like_loading = true;

        likeFactory.like(this.content.id.replace('track-', '')).then(res => {
          if (res) {
            this.content.likes = res.count;
            this.content.user_like = !this.content.user_like;
          }

          this.like_loading = false;
        });
      };

      this.toggle_audio = (track_id) => {
        if ($localStorage.state === 'playing' && $localStorage.current.id === this.content.id) {
          return lmpPlayer.pause();
        }

        lmpPlayer.find_track(this.content.id);
      };

      this.stop_audio = () => {
        if ($localStorage.state === 'playing') {
          lmpPlayer.pause();
        }
      };
    }],
    templateUrl: '/views/podcast.html'
  });
})();
