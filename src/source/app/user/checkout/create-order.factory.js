(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('createOrderFactory', createOrderFactory);

  createOrderFactory.$inject = ['$http', '$log', '$rootScope'];

  function createOrderFactory($http, $log, $rootScope) {
    return { createOrder };

    function createOrder(product_id, variation_id, coupon_code) {
      let url = `${$rootScope.base_url}/lmp-api/v1/create-order-with-coupon?product_id=${product_id}`;
      
      if (variation_id) url = `${url}&variation_id=${variation_id}`;
      if (coupon_code) url = `${url}&coupon_code=${coupon_code}`;

      return $http.post(url)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
