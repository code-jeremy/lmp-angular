(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('productFactory', productFactory);

  productFactory.$inject = ['$http', '$log', '$rootScope'];

  function productFactory($http, $log, $rootScope) {
    return { getProduct };

    function getProduct(product_id, variation_id) {
      let url = `${$rootScope.base_url}/lmp-api/v1/product?product_id=${product_id}`;
      if (variation_id) url = `${url}&variation_id=${variation_id}`;

      return $http.get(url)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
