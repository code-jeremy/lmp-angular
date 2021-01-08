(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('ordersFactory', ordersFactory);

  ordersFactory.$inject = ['$http', '$log', '$rootScope'];

  function ordersFactory($http, $log, $rootScope) {
    return { getOrders };

    function getOrders() {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/orders`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
