(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('registerFactory', registerFactory);

  registerFactory.$inject = ['$http', '$log', '$rootScope'];

  function registerFactory($http, $log, $rootScope) {
    return { register };

    function register(username, email) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/register/${id.replace('track-', '')}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
