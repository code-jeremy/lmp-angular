(function() {
  'use strict';

  angular
  .module('lmp')
  .component('playlist', {
    controller: ['authFactory', '$timeout', 'playlistFactory', '$localStorage', 'createPlaylistFactory', function(authFactory, $timeout, playlistFactory, $localStorage, createPlaylistFactory) {
      this.storage = $localStorage;
      this.regex = "([a-zA-Z0-9 '-]+)";
      this.has_playlists = true;

      if (authFactory.isAuthenticated()) {
        this.playlists = this.storage.profile.playlists;
        
        if (this.playlists.length > 0) {
          this.stage = 'type';
        } else {
          this.stage = 'new';
          this.has_playlists = false;
        }
      } else {
        this.stage = false;
      }

      this.add_to_existing = function() {
        this.loading = true;
      
        if (!this.selected) {
          this.show_none_selected = true;
          return;
        }
        
        playlistFactory.updatePlaylist(this.selected, false, $localStorage.playlist_track.id.replace('track-', '')).then(res => {
          $timeout(() => {
            if (!res || (res && !res.status)) {
              this.failure = true;
              this.message = res ? res.message : 'Sorry, something went wrong. Please try again.';
            } else {
              this.success = this.has_playlists = true;
              this.message = res.message;
            }
        
            this.stage = 'complete';
          });
        });
      };

      this.create = () => {
        if (/^[\w -]*$/.test(this.new_title)) {
          createPlaylistFactory.create($localStorage.playlist_track.id, this.new_title).then(res => {
            if (!res || (res && !res.status)) {
              this.failure = true;
              this.message = res ? res.message : 'Sorry, something went wrong. Please try again.';
            } else {
              $localStorage.profile.playlists = res.playlists;
              this.success = this.has_playlists = true;
              this.message = res.message;
            }
      
            this.stage = 'complete';
          });
        }
      };

      this.cancel_playlister = () => {
        $timeout(() => {
          this.message = null;
          this.failure = null;
          this.success = null;
          this.selected = null;
          this.loading = null;
          this.stage = authFactory.isAuthenticated() ? (this.has_playlists ? 'type' : 'new') : false; 
          this.storage.playlist_track = false;
        });
      };
    }],
    templateUrl: '/views/playlister.html'
  });
})();
