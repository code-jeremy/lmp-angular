(function() {
  'use strict';

  angular
  .module('lmp')
  .component('tracks', {
    bindings: {
      slides: '<',
      songs: '<'
    },
    controller: ['$rootScope', '$scope', '$window', '$localStorage', '$state', '$uiRouterGlobals', function($rootScope, $scope, $window, $localStorage, $state, $uiRouterGlobals) {
      this.storage = $localStorage;

      this.$onInit = () => {
        this.title = format_title(this.songs.format);
        this.format = this.songs.format;
        this.tracks = this.songs.content;
        this.page = this.songs.page;
        this.pages = this.songs.pages;
        this.slider = false;
        
        if (this.slides.slider && this.slides.slider.length > 0) {
          this.slider = this.slides.slider;
        }

        this.storage.queue = [ ...this.storage.queue, ...this.tracks ];
      }

      this.change_page = (page) => {
        $uiRouterGlobals.params.page = parseInt(page, 10);
        $state.go('.', $uiRouterGlobals.params);
      };

      this.on_scroll = () => { //$timeout(() =>
        this.fixed_header = window.scrollY > 200 || false;
      };

      angular.element($window).on('scroll', this.on_scroll);

      $scope.$on('$destroy', () => {
        angular.element($window).off('scroll', this.on_scroll);
      });
    }],
    templateUrl: '/views/tracks.html'
  });
})();
