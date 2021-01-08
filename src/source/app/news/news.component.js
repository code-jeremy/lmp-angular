(function() {
  'use strict';

  angular
  .module('lmp')
  .component('news', {
    bindings: {
      content: '<'
    },
    templateUrl: '/views/news.html'
  });
})();
