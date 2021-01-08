(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('relatedFactory', relatedFactory);

  relatedFactory.$inject = ['$http', '$log', '$rootScope'];

  function relatedFactory($http, $log, $rootScope) {
    return { getRelated };

    function getRelated(id) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/related?id=${id}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
