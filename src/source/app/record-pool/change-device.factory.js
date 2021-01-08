(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('changeDeviceFactory', changeDeviceFactory);

  changeDeviceFactory.$inject = ['$http', '$log', '$rootScope'];

  function changeDeviceFactory($http, $log, $rootScope) {
    return { change };

    function change(swap) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/rp-change-device${swap ? '?replace=true' : ''}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
