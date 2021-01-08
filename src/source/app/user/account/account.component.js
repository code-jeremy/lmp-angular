(function() {
  'use strict';

  angular
  .module('lmp')
  .component('account', {
    controller: ['$localStorage', function($localStorage) {
      this.storage = $localStorage;
    }],
    templateUrl: '/views/account.html'
  });
})();
