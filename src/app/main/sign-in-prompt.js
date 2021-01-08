(function() {
  'use strict';

  angular
  .module( 'lmp' )
  .component( 'signInPrompt', {
    bindings: {
      layout: '=',
    },
    controller: ['$localStorage', '$state', SignInPromptController],
    templateUrl: '/views/sign-in-prompt.html'
  });

  function SignInPromptController($localStorage, $state) {
    const ctrl = this;
    ctrl.storage = $localStorage;

    ctrl.login = () => {
      $localStorage.login_redirect = window.location.pathname;
      $state.go('main.login');
    }

  }
})();
