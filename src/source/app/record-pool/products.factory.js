(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('productsFactory', productsFactory);

  productsFactory.$inject = ['$http', '$log', '$rootScope'];

  function productsFactory($http, $log, $rootScope) {
    return { getProducts };

    function getProducts() {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/products`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
