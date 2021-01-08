(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('chartFactory', chartFactory);

  chartFactory.$inject = ['$http', '$rootScope', '$log'];

  function chartFactory($http, $rootScope, $log) {
    return { getChart };

    function getChart(slug) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/chart?filter[name]=${slug}`)
      .then(res => res.data[0])
      .catch(err => $log.debug(err));
    }
  }
})();
