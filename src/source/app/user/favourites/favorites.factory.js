(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('favoritesFactory', favoritesFactory);

  favoritesFactory.$inject = ['$http', '$log', '$rootScope'];

  function favoritesFactory($http, $log, $rootScope) {
    return { getFavorites };

    function getFavorites(page) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/favourites${page ? '?page=' + page : ''}`)
      .then(res => {
        return {
          pages: parseInt(res.headers('X-WP-TotalPages'), 10),
          page: page || 1,
          content: res.data
        };
      })
      .catch(err => $log.debug(err));
    }
  }
})();
