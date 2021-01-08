(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('durationFactory', durationFactory);

  durationFactory.$inject = ['$http', '$log', '$rootScope'];

  function durationFactory( $http, $log, $rootScope ) {
    return { update };

    function update(id, duration) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/duration/${id.replace('track-', '')}?duration=${duration}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
