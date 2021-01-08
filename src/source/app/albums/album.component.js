(function() {
  'use strict';

  angular
  .module('lmp')
  .component('album', {
    bindings: {
      content: '<'
    },
    controller: ['$localStorage', '$timeout', 'lmpPlayer', function($localStorage, $timeout, lmpPlayer) {
      this.storage = $localStorage;

      this.$onInit = () => {
        $localStorage.queue = [ ...this.storage.queue, ...this.content.tracks ];
        this.track_ids = this.content.tracks.map(track => track.id);
      }

      this.toggle_audio = () => {
        if (this.track_ids.indexOf($localStorage.current.id) > -1 && $localStorage.state === 'playing') { 
          lmpPlayer.pause();
        } else if (this.track_ids.indexOf($localStorage.current.id) > -1 && $localStorage.state !== 'playing') { 
        lmpPlayer.find_track($localStorage.current.id);
        } else if (this.track_ids.length > 0) { 
          lmpPlayer.find_track( this.track_ids[0] );
        }
      }
    }],
    templateUrl: '/views/album.html'
  });
})();
