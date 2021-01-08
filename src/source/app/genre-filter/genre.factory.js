(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('genreFactory', genreFactory);

  genreFactory.$inject = ['$http', '$q', '$localStorage', '$log', '$rootScope'];

  function genreFactory( $http, $q, $localStorage, $log, $rootScope ) {
    return { getGenres, getGenre };

    function getGenres() {
      return $http.get(`${$rootScope.base_url}/wp/v2/genre?per_page=100&orderby=count&order=desc`)
      .then(res => {
        const genres = res.data;
        genres.unshift({ slug: 'all', name: 'All genres' });

        return genres;
      })
      .catch(err => $log.debug(err));
    }

    function getGenre(slug) {
      return $http.get(`${$rootScope.base_url}/wp/v2/genre?slug=${slug}`)
      .then(res => res.data[0])
      .catch(err => $log.debug(err));
    }
  }
})();
