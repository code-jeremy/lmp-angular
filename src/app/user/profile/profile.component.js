(function() {
  'use strict';

  angular
  .module('lmp')
  .component('profile', {
    bindings: {
      profile: '<'
    },
    controller: ['userFactory', 'authFactory', '$rootScope', '$scope', '$stateParams', '$localStorage', '$state', '$timeout', function(userFactory, authFactory, $rootScope, $scope, $stateParams, $localStorage, $state, $timeout) {
      this.storage = $localStorage;

      this.update_profile = () => $timeout(() => {
        this.updating = true;
        
        userFactory.updateUser(this.profile).then(res => {
          authFactory.profile().then(res => $timeout(() => {
            $localStorage.profile = res;
            this.updating = false;
          }));
        });
      });
    }],
    templateUrl: '/views/profile.html'
  });
})();
