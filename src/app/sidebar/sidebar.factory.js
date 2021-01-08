(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('sidebarFactory', sidebarFactory);

  sidebarFactory.$inject = ['$http', '$rootScope', '$log'];

  function sidebarFactory($http, $rootScope, $log) {
    return { getSidebar };

    function getSidebar( slug ) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/sidebar`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
