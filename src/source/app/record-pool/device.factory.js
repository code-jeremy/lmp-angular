(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('deviceFactory', deviceFactory);

  deviceFactory.$inject = ['$http', '$log', '$rootScope'];

  function deviceFactory($http, $log, $rootScope) {
    return { getDevice };

    function getDevice() {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/rp-devices`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
