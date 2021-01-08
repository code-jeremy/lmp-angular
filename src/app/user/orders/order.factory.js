(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('orderFactory', orderFactory);

  orderFactory.$inject = ['$http', '$log', '$rootScope'];

  function orderFactory($http, $log, $rootScope) {
    return { getOrder };

    function getOrder(id) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/order-staging?id=${id}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
