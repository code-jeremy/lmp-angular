(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('menuFactory', menuFactory);

  menuFactory.$inject = ['$http', '$log', '$rootScope'];

  function menuFactory($http, $log, $rootScope) {
    return { getMenu };

    function getMenu(menu) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/navigation`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
