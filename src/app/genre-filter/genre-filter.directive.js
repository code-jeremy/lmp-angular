(function() {
  'use strict';

  angular
  .module('lmp')
  .directive('genreFilter', genreFilter);

  function genreFilter() {
    return {
      restrict: 'E',
      scope: { },
      controller: GenreFilterController,
      controllerAs: 'genre_filter',
      templateUrl: '/views/genre-filter.html'
    };
  }

  GenreFilterController.$inject = ['genreFactory', '$stateParams', '$state'];

  function GenreFilterController( genreFactory, $stateParams, $state ) {
    const genre_filter = this;
    genre_filter.genre = $stateParams.genre || 'all';

    genreFactory.getGenres().then(res => genre_filter.genres = res);

    genre_filter.change_genre = () => {
      $stateParams.genre = genre_filter.genre !== 'all' ? genre_filter.genre : undefined;
      $state.go($state.current.name, $stateParams, { reload: false, notify: true });
    };
  }
})();
