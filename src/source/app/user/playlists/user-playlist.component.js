(function() {
  'use strict';

  angular
  .module('lmp')
  .component('userPlaylist', {
    bindings: {
      content: '<'
    },
    controller: ['updatePlaylistFactory', '$stateParams', '$localStorage', '$state', '$timeout', 'ModalService', function(updatePlaylistFactory, $stateParams, $localStorage, $state, $timeout, ModalService) {
      this.storage = $localStorage;

      this.$onInit = () => {
        $localStorage.queue = this.content.tracks;
      }

      this.re_cache = (songs) => {
        // Remove current tracks list from cache
        // and replace with updated playlist
        // First check if tracks are in queue
        // If queue empty assume tracks are in playlist
        if (this.storage.queue.length > 0) {
          this.storage.queue = songs;
        } else {
          this.storage.playlist = songs;
        }
      };

      // AS Sortable events
      this.sort_list = {
        orderChanged: (event) => {
          const id = this.content.id;
          let tracks = event.dest.sortableScope.modelValue.map(obj => obj.id.replace('track-', ''));

          updatePlaylistFactory.update(id, tracks.join(',')).then(res => {
            this.re_cache(res.tracks);
          });
        },
        containment: '#sort-list'
      };

      this.delete_track = (index) => ModalService.showModal({
        templateUrl: '/views/modal.html',
        controller: 'ModalController',
        controllerAs: 'lmp_modal',
        inputs: {
          playlist: false,
          playlist_track: {
            list: this.content,
            index: index
          }
        }
      }).then(modal => modal.close.then((res) => {
        if (res) {
          this.content.tracks = res;
          this.re_cache(res);
        }
      }));
      
      this.remove_playlist = () => ModalService.showModal({
        templateUrl: '/views/modal.html',
        controller: 'ModalController',
        controllerAs: 'lmp_modal',
        inputs: {
          playlist_track: false,
          playlist: this.content
        }
      }).then(modal => modal.close.then(res => {
        if (res) {
          $state.go('user-playlists');
        }
      }));
    }],
    templateUrl: '/views/user-playlist.html'
  });
})();
