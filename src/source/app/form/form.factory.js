(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('formFactory', formFactory);

  formFactory.$inject = ['$http', '$rootScope', '$log'];

  function formFactory($http, $rootScope, $log) {
    return { postMessage };

    function postMessage() {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/contact-form`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
