(function() {
  'use strict';

  angular
  .module('lmp')
  .directive('sortFilter', sortFilter);

  function sortFilter() {
    return {
      restrict: 'E',
      scope: {},
      controller: SortFilterController,
      controllerAs: 'sort_filter',
      templateUrl: '/views/sort-filter.html'
    };
  }

  SortFilterController.$inject = ['$scope', '$stateParams', '$state'];

  function SortFilterController($scope, $stateParams, $state) {
    const sort_filter = this;
    sort_filter.order = $stateParams.order || 'newest';
    sort_filter.options = [
      {
        value: 'newest',
        name: 'Newest'
      }, {
        value: 'oldest',
        name: 'Oldest'
      }, {
        value: 'az',
        name: 'A - Z'
      }, {
        value: 'za',
        name: 'Z - A'
      }, {
        value: 'likes',
        name: 'Likes'
      }, {
        value: 'plays',
        name: 'Plays'
      },
    ];

    sort_filter.change_order = () => {
      $stateParams.order = sort_filter.order !== 'newest' ? sort_filter.order : undefined;
      $state.go($state.current.name, $stateParams, { reload: false, notify: true });
    };
  }
})();
