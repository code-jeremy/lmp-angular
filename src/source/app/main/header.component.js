(function() {
  'use strict';

  angular
  .module('lmp')
  .component('siteHeader', {
    bindings: {
      navigation: '='
    },
    controller: ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$localStorage', '$transitions', 'authFactory', function($rootScope, $scope, $window, $document, $timeout, $state, $localStorage, $transitions, authFactory) {
      this.class = this.page = this.active = false;
      this.storage = $localStorage;
      this.auth = authFactory.isAuthenticated();
      this.layout = $rootScope.layout;

      this.reset_menus = () => $timeout(() => {
        this.menu_open = !this.layout.mobile;
        this.instant_search_open = this.user_menu_open = false;
      });

      this.mouseover_sub_menu = (id) => {
        if ($window.innerWidth > 960) {
          main[`sub_menu_${id}`] = true;
        }
      };

      this.mouseleave_sub_menu = (id) => {
        if ($window.innerWidth > 960) {
          main[`sub_menu_${id}`] = false;
        }
      };

      this.toggle_menu = () => {
        this.menu_open = !this.menu_open;
        this.layout.fixed = this.menu_open;
        this.user_menu_open = false;
      };

      this.reset_menus();

      this.log_out = () => authFactory.logout();

      this.toggle_user_menu = () => $timeout(() => {
        if (!authFactory.isAuthenticated()) {
          return $state.go('main.login');
        }

        this.user_menu_open = this.user_menu_open ? false : true;
        this.layout.fixed = this.user_menu_open;
      
        if (this.menu_open && this.layout.mobile) {
          this.menu_open = false;
        }
      });

      this.change_class = () => $timeout(() => {
        if (window.scrollY > 200) {
          this.class = true;
        } else {
          this.class = false;
        }
      });

      this.set_page = (event, args) => $timeout(() => {
        this.page = args;
      });

      this.instant_search = false;

      this.toggle_search = () => {
        this.instant_search = !this.instant_search;
      };

      /**
       * On state change start event close any open slide in panels
       */
      this.on_before = $transitions.onBefore({ }, () => {
        this.reset_menus();
        this.instant_search = false;
      });

      angular.element($window).on('scroll', this.change_class);
      this.change_class();

      $scope.$on('$destroy', () => {
        this.on_before();
        angular.element($window).off('scroll', this.change_class);
      });
    }],
    templateUrl: '/views/header.html'
  });
})();
