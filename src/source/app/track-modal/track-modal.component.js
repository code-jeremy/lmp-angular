(function() {
  'use strict';

  angular
  .module('lmp')
  .component('trackModal', {
    controller: ['$window', '$timeout', '$rootScope', '$localStorage', 'authFactory', 'likeFactory', function($window, $timeout, $rootScope, $localStorage, authFactory, likeFactory) {
      this.storage = $localStorage;
      this.show = true;

      this.like = () => {
        if (!authFactory.isAuthenticated()) {
          return $rootScope.$broadcast('unauthorized', {
            type: 'like',
            redirect: `/${$localStorage.view_track.format}/${$localStorage.view_track.slug}`
          });
        }

        this.like_loading = true;
      
        likeFactory.like(this.storage.view_track.id.replace( 'track-', '')).then(res => {
          if(res) {
            $localStorage.view_track.likes = res.count;
            $localStorage.view_track.user_like = !$localStorage.view_track.user_like;
          }
      
          this.like_loading = false;
        });
      };

      this.add_to_playlist = () => {
        if (!authFactory.isAuthenticated()) {
          return $rootScope.$broadcast('unauthorized', {
            type: 'playlist',
            redirect: `/${$localStorage.view_track.format}/${$localStorage.view_track.slug}`
          });
        }
      
        $timeout(() => {
          $localStorage.playlist_track = $localStorage.view_track;
          $localStorage.view_track = false;
        });
      };

      this.toggle = () => {
        this.show = false;

        $timeout(() => {
          $localStorage.view_track = false;
          this.show = true;
        }, 600);
      }
    }],
    templateUrl: '/views/track-modal.html'
  });
})();
