(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('featuredFactory', featuredFactory);

  featuredFactory.$inject = ['$http', '$rootScope', '$log'];

  function featuredFactory($http, $rootScope, $log) {
    return { getContent };

    function getContent(slug) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/featured`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
