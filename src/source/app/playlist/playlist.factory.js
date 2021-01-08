(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('playlistFactory', playlistFactory);

  playlistFactory.$inject = ['$http', '$localStorage', '$rootScope'];

  function playlistFactory($http, $localStorage, $rootScope) {
    return { getPlaylist, updatePlaylist, deletePlaylist };

    function getPlaylist( slug ) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/playlist?slug=${slug}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }

    function updatePlaylist(id, newOrder, track) {
      newOrder = newOrder || false;
      track = track || false;

      return $http.put(`${$rootScope.base_url}/lmp-api/v1/update-playlist/${id}?${newOrder ? 'tracks=' + newOrder.map( function( elem ){ return elem.id.replace( 'track-', '' ); }).join( ',' ) : ''}${track ? 'track=' + track : ''}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }

    function deletePlaylist( id ) {
      return $http.put(`${$rootScope.base_url}/lmp-api/v1/delete-playlist/${id}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
