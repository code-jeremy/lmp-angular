(function() {
  'use strict';

  angular
  .module('lmp')
  .component('singlePodcast', {
    bindings: {
      podcast: '<'
    },
    templateUrl: '/views/single-podcast.html' 
  });
})();
