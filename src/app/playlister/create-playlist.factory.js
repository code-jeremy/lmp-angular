(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('createPlaylistFactory', createPlaylistFactory);

  createPlaylistFactory.$inject = ['$http', '$log', '$rootScope'];

  function createPlaylistFactory($http, $log, $rootScope) {
    return { create };

    function create(track, title) {
      return $http.post(`${$rootScope.base_url}/lmp-api/v1/create-playlist?track=${track}&title=${title}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
