(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('playsFactory', playsFactory);

  playsFactory.$inject = ['$http', '$log', '$rootScope'];

  function playsFactory($http, $log, $rootScope) {
    return { addPlay };

    function addPlay(id) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/plays/${id.replace('track-', '')}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
