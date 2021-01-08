(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('chartsFactory', chartsFactory);

  chartsFactory.$inject = ['$http', '$rootScope', '$log'];

  function chartsFactory($http, $rootScope, $log) {
    return { getCharts };

    function getCharts(page) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/chart-list?page=${page}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
