(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('historyFactory', historyFactory);

  historyFactory.$inject = ['$http', '$log', '$rootScope'];

  function historyFactory($http, $log, $rootScope) {
    return { getHistory };

    function getHistory( page ) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/history${page ? '?page=' + page : ''}`)
      .then(res => {
        return {
          pages: res.headers('X-WP-TotalPages'),
          page: page || 1,
          content: res.data
        };
      })
      .catch(err => $log.debug(err));
    }
  }
})();
