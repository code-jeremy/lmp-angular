(function() {
  'use strict';

  angular
  .module('lmp')
  .directive('artistHeader', artistHeader);

  artistHeader.$inject = ['$window'];

  function artistHeader($window) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      function size_header() {
        scope.style = `${$window.innerHeight - ($window.innerWidth > 960 ? 226 : 166)}px`;
      }

      size_header();

      angular.element($window ).on('resize', size_header);

      scope.$on('$destroy', () => {
        angular.element($window).off('resize', size_header);
      });
    }
  }
})();
