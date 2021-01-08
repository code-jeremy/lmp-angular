(function() {
  'use strict';

  angular
  .module('lmp')
  .controller('ModalController', ModalController);

  ModalController.$inject = ['close', 'playlist', 'playlist_track', 'updatePlaylistFactory', 'deletePlaylistFactory', '$scope', '$state', '$timeout'];

  function ModalController(close, playlist, playlist_track, updatePlaylistFactory, deletePlaylistFactory,$scope, $state, $timeout) {
    const lmp_modal = this;
    lmp_modal.decide = true;

    if (playlist) {
      lmp_modal.message = `Are you sure you want to delete the playlist "${playlist.title}". This can't be undone`;
    }

    lmp_modal.confirm = () => {
      if (playlist) {
        $timeout(() => {
          lmp_modal.loading = true;
          lmp_modal.decide = false;
          
          deletePlaylistFactory.remove(playlist.id).then(() => {
            $state.go('user-playlists');
          });
        });
      }

      if (playlist_track) {
        $timeout(() => {
          lmp_modal.loading = true;
          lmp_modal.decide = false;
          playlist_track.list.tracks.splice(playlist_track.index, 1);

          updatePlaylistFactory.update(playlist_track.list.id, playlist_track.list.tracks.map(obj => obj.id.replace('track-', '')).join(',')).then(res => {
            close(res.tracks, 0);
            lmp_modal.loading = false;
          });
        });
      }
    };

    lmp_modal.cancel = (res) => {
      close(res, 0);
    };

    // Delete playlist track
    if( playlist_track ) {
      lmp_modal.message = `Are you sure you want to delete the track "${playlist_track.list.tracks[playlist_track.index].title}"?`;
    }

    lmp_modal.close = (res) => {
      close(res, 0);
    };
  }
})();
