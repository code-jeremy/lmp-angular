(function() {
  'use strict';

  angular
    .module('lmp')
    .directive('userMenu', userMenu);

  function userMenu() {
    return {
      restrict: 'E',
      scope: {},
      controller: UserMenuController,
      controllerAs: 'user_menu',
      templateUrl: '/views/user-menu.html',
    };
  }

  UserMenuController.$inject = ['$localStorage'];

  function UserMenuController($localStorage) {
    const user_menu = this;
    user_menu.storage = $localStorage;

    user_menu.login = () => {
      user_menu.login_open = !user_menu.login_open;
    };
  }
})();
