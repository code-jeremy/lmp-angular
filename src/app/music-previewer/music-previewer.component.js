(function() {
  'use strict';

  angular
  .module( 'lmp' )
  .component('musicPreviewer', {
    controller: ['tracksFactory', 'genreFactory', '$scope', '$localStorage', '$timeout', function(tracksFactory, genreFactory, $scope, $localStorage, $timeout) {
      this.storage = $localStorage;
      this.genre_start = 0;

      this.change_genre = (genre) => {
        if (genre) this.genre = genre;

        tracksFactory.getMusic('all', this.genre.slug, false, 1, false, 5).then(res => {
          this.genre.tracks = res.content;
           
          $timeout(() => {
            if (!$localStorage.queue) {
              $localStorage.playlist = [ ...$localStorage.playlist, ...res.content ];
            } else {
              $localStorage.queue = [ ...$localStorage.queue, ...res.content ];
            }
          });
        });
      };

      genreFactory.getGenres().then(res => {
        res.shift();
        this.genres = res;
        this.genre = this.genres[0];
        this.change_genre(this.genres[0]);
      });

      this.prev_genres = () => {
        if (this.genre_start > 0) {
          this.genre_start = this.genre_start - 7;
          this.change_genre(this.genres[this.genre_start]);
        } else if (this.genres.length > ((this.genre_start + 1) + 7)) {
          this.genre_start = 0;
          this.change_genre(this.genres[this.genre_start]);
        }
      };

      this.next_genres = () => $timeout(() => {
        if ((this.genre_start + 1) + 7 < this.genres.length) {
          this.genre_start = this.genre_start + 7;
          this.change_genre(this.genres[this.genre_start]);
        } else if (this.genres.length % 7 === 0) {
          this.genre_start = Math.floor(this.genres.length / 7) - 1;
          this.change_genre(this.genres[this.genre_start]);
        }
      });
    }],
    templateUrl: '/views/previewer.html'
  });
})();
