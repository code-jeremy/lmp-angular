(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('protectFactory', protectFactory);

  protectFactory.$inject = ['$q', 'authFactory', '$state', '$localStorage'];

  function protectFactory($q, authFactory, $state, $localStorage) {
    return { checkAuth };
      
    function checkAuth() {
      const defer = $q.defer();

      if (authFactory.isAuthenticated()) {
        defer.resolve();
      } else {
        $localStorage.login_redirect = window.location.pathname;

        if (window.location.search) {
          $localStorage.login_redirect = `${$localStorage.login_redirect}${window.location.search}`;
        }

        $state.go('login');
        
        defer.reject('unauthorized');
      }

      return defer.promise;
    }
  }
})();
