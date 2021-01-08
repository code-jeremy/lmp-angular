(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('deletePlaylistFactory', deletePlaylistFactory);

  deletePlaylistFactory.$inject = ['$http', '$log', '$rootScope'];

  function deletePlaylistFactory($http, $log, $rootScope) {
    return { remove };

    function remove(id) {
      return $http.put(`${$rootScope.base_url}/lmp-api/v1/delete-playlist/${id}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
