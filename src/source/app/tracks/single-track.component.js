(function() {
  'use strict';

  angular
    .module('lmp')
    .component('singleTrack', {
      bindings: {
        track: '<',
        album: '<'
      },
      controller: ['$rootScope', '$localStorage', 'ModalService', 'likeFactory', '$timeout', 'lmpPlayer', function($rootScope, $localStorage, ModalService, likeFactory, $timeout, lmpPlayer) {
        this.storage = $localStorage;
        this.layout = $rootScope.layout;

        this.add_to_playlist = () => ModalService.showModal({
          templateUrl: '/views/playlist-manager.html',
          controller: 'PlaylistManagerController',
          controllerAs: 'playlist_manager',
          inputs: {
            track: this.track,
          }
        }).then((modal) => { });

        this.like = () => likeFactory.like(this.track.id.replace('track-', '')).then(res => {
          if (res) this.track.likes = res.count;
        });

        this.view_detail = () => $timeout(() => {
          if ($localStorage.current && (this.track.id === $localStorage.current.id)) {
            $localStorage.view_track = $localStorage.current;
          } else {
            $localStorage.view_track = this.track;
          }
        });

        this.toggle_audio = (track_id) => $timeout(() => {
          if($localStorage.state === 'playing' && $localStorage.current.id === this.track.id) {
            return lmpPlayer.pause();
          }

          if($localStorage.state === 'idle' && $localStorage.current.id === this.track.id) {
            let canPlay = lmpPlayer.resume($localStorage.current.progress);

            if (!canPlay) lmpPlayer.find_track(track_id);
          }

          lmpPlayer.find_track(track_id);
        });
      }],
      templateUrl: '/views/single-track.html' 
    });
})();
