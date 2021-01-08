(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('pageFactory', pageFactory);

  pageFactory.$inject = ['$http', '$rootScope', '$log'];

  function pageFactory($http, $rootScope) {
    return { getPage };

    function getPage(slug) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/pages?type=page&filter[name]=${slug}`)
      .then(res => res.data[0])
      .catch(err => $log.debug(err));
    }
  }
})();
