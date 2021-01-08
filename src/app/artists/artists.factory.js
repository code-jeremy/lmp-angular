(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('actsFactory', actsFactory);

  actsFactory.$inject = ['$http', '$window', '$rootScope', '$log'];

  function actsFactory($http, $window, $rootScope, $log) {
    return { getActs };

   function getActs(type, page) {
      let per_page = 13;

      if($window.innerWidth > 1400) {
        per_page = 13;
      } else if( $window.innerWidth > 960 ) {
        per_page = 11;
      } else if( $window.innerWidth > 600 ) {
        per_page = 9;
      } else {
        per_page = 10;
      }

      const url = `${$rootScope.base_url}/lmp-api/v1/artists?type[]=${type}&per_page=${per_page}&page=${page}`;

      return $http.get(url)
      .then(res => {
        return {
          pages: parseInt(res.headers('X-WP-TotalPages'), 10),
          page: parseInt(page, 10),
          content: res.data,
          type: type
        };
      })
      .catch(err => $log.debug(err));
    }
  }
})();
