(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('userPlaylistsFactory', userPlaylistsFactory);

  userPlaylistsFactory.$inject = ['$http', '$log', '$rootScope'];

  function userPlaylistsFactory($http, $log, $rootScope) {
    return { getList };

    function getList(id) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/user-playlists`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
