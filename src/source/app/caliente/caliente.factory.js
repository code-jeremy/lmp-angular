(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('calienteFactory', calienteFactory);

  calienteFactory.$inject = ['$http', '$rootScope', '$log'];

  function calienteFactory($http, $rootScope, $log) {
    return { getContent };

    function getContent(slug) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/caliente`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
