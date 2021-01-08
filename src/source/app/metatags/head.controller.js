(function() {
  'use strict';

  angular
  .module('lmp')
  .controller('HeadController', HeadController);

  HeadController.$inject = ['$scope', 'metaService', '$transitions', '$location', '$window', '$timeout'];

  function HeadController($scope, metaService, $transitions, $location, $window, $timeout) {
    const head = this;
    head.properties = metaService.getProperties();

    head.start_listener = $transitions.onStart({ }, () => {
      metaService.setProperties({ });
    });

    head.listener = $transitions.onSuccess({ }, () => {
      head.properties = metaService.getProperties();

      head.analytics({
        hitType: 'pageview',
        page: $location.path(),
        title: head.title,
        location: $location.url()
      });
    });

    head.analytics = pageview => {
      if (window.ga) {
        $window.ga('send', pageview);
      } else {
        $timeout(head.analytics(pageview), 500);
      }
    }

    $scope.$on('$destroy', () => {
      head.start_listener();
      head.listener();
    });
  }
}());
