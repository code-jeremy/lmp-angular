(function() {
  'use strict';

  angular
  .module('lmp')
  .directive('instantSearch', instantSearch);

  function instantSearch() {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      controller: InstantSearchController,
      controllerAs: 'instant_search',
      templateUrl: '/views/instant-search.html'
    };
  }

  InstantSearchController.$inject = [ 'instantSearchFactory', '$localStorage', '$timeout'];

  function InstantSearchController( instantSearchFactory, $localStorage, $timeout) {
    const instant_search = this;
    instant_search.storage = $localStorage;

    instant_search.run_search = () => {
      instant_search.storage.search_results = null;
      instant_search.searching = true;
  
      if (instant_search.storage.search_term.length > 2) {
        instantSearchFactory.search(instant_search.storage.search_term).then(res => {
          $timeout(() => {
            instant_search.storage.search_results = res;
            instant_search.searching = false;
          });
        });
      }
    };
  }
})();
