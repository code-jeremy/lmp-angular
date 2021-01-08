(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('cancelSubFactory', cancelSubFactory);

  cancelSubFactory.$inject = ['$http', '$log', '$rootScope'];

  function cancelSubFactory($http, $log, $rootScope) {
    return { cancel };

    function cancel(id) {
      return $http.put(`${$rootScope.base_url}/lmp-api/v1/cancel-subscription?order_id=${id}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
