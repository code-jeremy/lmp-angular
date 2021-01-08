(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('formFactory', formFactory);

  formFactory.$inject = ['$http', '$rootScope', '$log'];

  function formFactory($http, $rootScope, $log) {
    return { postMessage };

    function postMessage(data) {
      return $http.post(`${$rootScope.base_url}/lmp-api/v1/form`, data)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
