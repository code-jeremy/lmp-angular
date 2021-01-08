(function() {
  'use strict';

  angular
  .module('lmp')
  .component('layout', {
    bindings: {
      navigation: '<'
    },
    controller: ['$rootScope', '$window', '$localStorage', 'userFactory', function($rootScope, $window, $localStorage, userFactory) {
      if ($localStorage.auth && $localStorage.profile && !$localStorage.profile.hasOwnProperty('has_record_pool')) {
        userFactory.getUser().then(res => {
          if (res.id) {
            $localStorage.profile = res;
          }
        })
      }
    }],
    templateUrl: '/views/layout.html'
  });
})();
