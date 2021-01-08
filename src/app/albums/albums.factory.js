(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('albumFactory', albumFactory);

  albumFactory.$inject = ['$http', '$rootScope', '$log'];

  function albumFactory($http, $rootScope, $log) {
    return { getAlbums };

    function getAlbums(page, slug) {
      page = page || 1;
      slug = slug || false;
      
      let query = `?per_page=12&page=${page}`;

      if( slug ) { 
        query = `?name=${slug}`; 
      }

      return $http.get(`${$rootScope.base_url}/lmp-api/v1/albums${query}`)
      .then(res => {
        if (slug) {
          return res.data[0];
        }

        return {
          pages: parseInt(res.headers('X-WP-TotalPages'), 10),
          page: parseInt(page, 10),
          content: res.data
        }
      })
      .catch(err => $log.debug(err));
    }
  }
})();
