(function() {
  'use strict';

  angular
  .module('lmp' )
  .factory('instantSearchFactory', instantSearchFactory);

  instantSearchFactory.$inject = ['$http', '$log', '$rootScope'];

  function instantSearchFactory($http, $log, $rootScope) {
    return { search };

    function search(term) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/instant-search?term=${term}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
