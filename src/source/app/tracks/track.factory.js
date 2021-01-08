(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('trackFactory', trackFactory);

  trackFactory.$inject = ['$http', '$log', '$rootScope'];

  function trackFactory($http, $log, $rootScope) {
    return { getTrack };

    function getTrack(type, slug) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/music?type=${type}&filter[name]=${slug}`)
      .then(res => res.data[0])
      .catch(err => $log.debug(err));
    }
  }
})();
