(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('likeFactory', likeFactory);

  likeFactory.$inject = ['$http', '$log', '$rootScope'];

  function likeFactory($http, $log, $rootScope) {
    return { like };

    function like(id) {
      return $http.put(`${$rootScope.base_url}/lmp-api/v1/likes/${id}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
