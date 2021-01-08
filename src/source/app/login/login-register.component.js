(function() {
  'use strict';

  angular
    .module('lmp')
    .component('loginRegister', {
      bindings: {
        message: '<'
      },
      controller: ['$rootScope', '$scope', 'authFactory', '$location', '$localStorage', '$state', '$timeout', '$stateParams', LoginRegisterController],
      templateUrl: '/views/login-register.html'
  });

  function LoginRegisterController($rootScope, $scope, authFactory, $location, $localStorage, $state, $timeout, $stateParams) {
    const ctrl = this;

    if ($stateParams.redirect) {
      $localStorage.login_redirect = $stateParams.redirect;

      if ($stateParams.type) {
        zenscroll.to(document.body, 300);
        
        $timeout(() => {
          switch ($stateParams.type) {
            case 'playlist':
              ctrl.message = '<p>You must be logged in to create playlists.</p>';
              break;
            case 'like':
              ctrl.message = '<p>You must be logged in to save music to your favorites.</p>'
              break;
          }
        });
      }
    }

    if ($scope.message) {
      ctrl.message = $scope.message;
    }

    ctrl.login = () => {
      $rootScope.layout.loading = true;
      ctrl.message = null;

      authFactory.login(ctrl.username, ctrl.password).then(res => {
        ctrl.message = res;
        $rootScope.layout.loading = false;
      })
      .catch(err => console.log(err));
    }

    ctrl.register = () => {
      $rootScope.layout.loading = true;
      ctrl.message = true;

      authFactory.register(ctrl.regusername, ctrl.regemail)
      .then(res => {
        ctrl.message = res.message;
        ctrl.error = !res.status;

        if (res.status) {
          ctrl.regemail = ctrl.regusername = null;
        }

        $rootScope.layout.loading = false;
      })
      .catch(err => console.log(err));
    }
  }
})();