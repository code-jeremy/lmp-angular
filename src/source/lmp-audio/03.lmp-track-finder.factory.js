(function() {
  'use strict';

  angular
  .module('lmpAudio')
  .factory('lmpTrackFinder', lmpTrackFinder);

  lmpTrackFinder.$inject = ['$localStorage', '$q', '$log', '$timeout'];

  function lmpTrackFinder($localStorage, $q, $log, $timeout) {
    return {
      search(track_id) {
        return $q((resolve, reject) => {
          if (track_id === 'lmp-radio') {
            resolve({
              id: 'lmp-radio',
              title: 'LMP Radio',
              artwork: 'https://www.iamlmp.com/assets/img/artwork/lmp-radio-artwork.png',
              artwork_large: 'https://www.iamlmp.com/assets/img/artwork/lmp-radio-artwork.png',
              artwork_small: 'https://www.iamlmp.com/assets/img/artwork/lmp-radio-artwork.png',
              url: 'http://lmpfm.domint.net:8016/;stream.mp3'
            });
          }

          for (let i = 0; i < $localStorage.playlist.length; i += 1) {
            if (track_id === $localStorage.playlist[i].id) {              
              resolve($localStorage.playlist[i]);
            }
          }

          for (let i = 0; i < $localStorage.queue.length; i += 1) {
            if (track_id === $localStorage.queue[i].id) {
              $localStorage.playlist = $localStorage.queue;
              $localStorage.queue = [];
              
              resolve($localStorage.playlist[i]);
            }
          }
        
          $timeout(() => {
            $localStorage.loading = '';
            $localStorage.state = 'playing';
            reject('Oops... something went wrong');
          });
        });
      }
    };
  }
})();
