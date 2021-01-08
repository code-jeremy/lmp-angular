(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('updatePlaylistFactory', updatePlaylistFactory);

  updatePlaylistFactory.$inject = ['$http', '$log', '$rootScope'];

  function updatePlaylistFactory($http, $log, $rootScope) {
    return { update };

    function update( id, tracks ) {
      return $http.put(`${$rootScope.base_url}/lmp-api/v1/update-playlist/${id}?tracks=${tracks}`)
        .then(res => res.data)
        .catch(err => $log.debug(err));
    }
  }
})();
