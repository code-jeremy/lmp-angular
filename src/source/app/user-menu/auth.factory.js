(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('authFactory', authFactory);

  authFactory.$inject = ['$http', '$localStorage', '$rootScope', '$state', '$location', '$log', '$timeout'];

  function authFactory($http, $localStorage, $rootScope, $state, $location, $log, $timeout) {
    return {
      login,
      profile,
      profileFull,
      logout,
      isAuthenticated,
      token,
      register,
      reset,
      timenow
    };

    const protectedStates = [
      'user-change-password',
      'user-account',
      'user-profile',
      'user-playlist',
      'user-playlists',
      'user-favorites',
      'user-order',
      'user-orders',
      'user-order-status',
      'user-review-order',
      'user-checkout'
    ];

    function login(username, password) {
      return $timeout(() => {
        $rootScope.layout.loading = true;
        let url = `${$rootScope.base_url}/lmp-api/v1/login`;
        url = `${url}?username=${username}&password=${password}`;

        return $http.post(`${$rootScope.base_url}/lmp-api/v1/login?username=${username}&password=${password}`)
        .then(res => {
          if (res.data.status) {
            $localStorage.auth = res.data.auth;
            $localStorage.profile = res.data.profile;

            $timeout(() => {
              if ($localStorage.login_redirect) {
                return $timeout(loginRedirect, 500);
              }
            
              return $state.go('user-account');
            });
          }
          
          $rootScope.layout.loading = false;
          return res.data.message;
        })
        .catch(err => console.log(err));
      });
    }

    function loginRedirect() {
      const redirect = $localStorage.login_redirect;
      $localStorage.login_redirect = '';

      return $location.url(redirect);
    }

    function profile(auth) {
      if (auth && auth.access_token) {
        $http({
          url : `${$rootScope.base_url}/wp/v2/users/me?_envelope`,
          method : 'GET',
          headers : {
              'Content-Type': 'application/json',    
              'Authorization': `Bearer ${auth.access_token}`
          }
        })
        .then(res => {
          if (res.data.status == 200) {
            $localStorage.profile = res.data.body;
            $localStorage.auth = auth;

            if ($localStorage.login_redirect) {
              const redirect = $localStorage.login_redirect;
              $localStorage.login_redirect = null;
              $state.go(redirect);
            } else {
              $state.reload();
            }

            return res.data.body;
          }

          return false;
        })
        .catch(err => $log.debug(err));
      }

      return $http.get(`${$rootScope.base_url}/wp/v2/users/me?_envelope`)
      .then(res => {
        $localStorage.profile = res.data.body;

        return res.data.body;
      })
      .catch(err => $log.debug(err));
    }

    function profileFull() {
      return $http.get(`${$rootScope.base_url}/wp/v2/users/me?context=edit&_envelope`)
      .then(res => res.data.body)
      .catch(err => $log.debug(err));
    }

    function timenow() {
      return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    }

    function logout() {
      $localStorage.auth = $localStorage.profile = null;

      return $state.reload();
    }

    function isAuthenticated() {
      if ($localStorage.auth && $localStorage.profile) {
        return true;
      }

      return false;
    }

    function token() {
      return $localStorage.auth.access_token;
    }

    function register(username, email) {
      return $http.post(`${$rootScope.base_url}/lmp-api/v1/register?username=${username}&email=${email}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }

    function reset(username) {
      return $http.post(`${$rootScope.base_url}/lmp-api/v1/password-reset?username=${username}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
