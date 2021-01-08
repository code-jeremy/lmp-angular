(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('actFactory', actFactory);

  actFactory.$inject = ['$http', '$rootScope', '$log'];

  function actFactory($http, $rootScope, $log) {
    return { getAct };

    function getAct(type, slug) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/artists?type=${type}&filter[name]=${slug}`)
      .then(res => res.data[0])
      .catch(err => $log.debug(err));
    }
  }
})();
