( function() {
  'use strict';

  angular
  .module('lmp')
  .directive('shareButton', shareButton);

  function shareButton() {
    return {
      restrict: 'E',
      templateUrl: '/views/share-button.html',
      controller: ShareButtonController,
      controllerAs: 'share',
      scope: {
        content: '<'
      }
    };
  }

  ShareButtonController.$inject = ['$timeout', '$localStorage', '$scope'];

  function ShareButtonController($timeout, $localStorage, $scope) {
    const share = this;

    share.share = () => $timeout(() => {
      $localStorage.share = $scope.content;
    });
  }
})();