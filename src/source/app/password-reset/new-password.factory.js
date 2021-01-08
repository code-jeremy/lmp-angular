(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('newPasswordFactory', newPasswordFactory);

  newPasswordFactory.$inject = ['$http', '$log', '$rootScope'];

  function newPasswordFactory($http, $log, $rootScope) {
    return { reset };

    function reset(key, login, pass) {
      let url = `${$rootScope.base_url}/lmp-api/v1/new-password?key=${key}&login=${login}&password=${pass}`;

      return $http.get(url)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
