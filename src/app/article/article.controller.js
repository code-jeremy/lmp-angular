(function() {
  'use strict';

  angular
  .module('lmp')
  .component('article', {
    bindings: {
      content: '<'
    },
    templateUrl: '/views/article.html'
  });
})();
