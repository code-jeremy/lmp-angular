(function() {
  'use strict';

  angular
  .module('lmp')
  .controller('BodyController', BodyController);

  BodyController.$inject = ['$rootScope', '$scope', '$localStorage', '$timeout', '$window', 'userFactory', 'authFactory', '$state', '$location', '$transitions', 'cfpLoadingBar'];

  function BodyController($rootScope, $scope, $localStorage, $timeout, $window, userFactory, authFactory, $state, $location, $transitions, cfpLoadingBar) {
    const body = this;

    $rootScope.layout = {
      loading: true,
      mobile: $window.innerWidth < 961 || false,
      fixed: false,
      sign_in: false
    };

    body.on_error = $transitions.onError({ }, (trans) => {
      if (trans.error().detail == 'unauthorized') {
        $state.go('main.login');
      }

      $rootScope.layout.loading = false;
      $rootScope.layout.fixed = false;
      cfpLoadingBar.complete();
      zenscroll.to(document.body, 300);
    });

    body.on_start = $transitions.onStart({ }, (trans) => {
      cfpLoadingBar.start();
      $localStorage.view_track = false;
      $localStorage.queue = [];
      $rootScope.layout.fixed = false;
      body.menu = false;
      body.classes = [];
    });

    body.on_success = $transitions.onSuccess({ }, (trans) => {
      body.menu = false;
		  if (trans.to().name) body.classes = [trans.to().name.split('.').join('-')];

      switch(trans.to().name) {
        case 'mixes':
        case 'tracks':
        case 'mixtapes':
        case 'live-tracks':
        case 'charts':
        case 'chart':
        case 'podcasts':
          body.classes.push('page-tracklist');
          body.menu = 'music';
        break;
        case 'track':
        case 'mix':
        case 'mixtape':
        case 'live-track':
          body.classes.push('single-track');
        break;
        case 'artists':
        case 'arist':
        case 'djs':
        case 'dj':
          body.menu = 'artists';
        break;
        case 'videos':
          body.menu = 'videos';
        break;
        case 'news':
        case 'article':
          body.menu = 'news';
        break;
      }
      
      const paths = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');

      if (paths.length > 0) {
        body.classes.push(paths[(paths.length - 1)]);
      }
    });

    body.on_finish = $transitions.onFinish({ }, () => {
      cfpLoadingBar.complete();
      zenscroll.to(document.body, 300);
      $rootScope.layout.loading = false;
    });

    body.is_mobile = () => $timeout(() => {
      $rootScope.layout.mobile = ( $window.innerWidth < 961 ? true : false );
    });

    body.is_mobile();

    body.resize_check = () => {
      $timeout.cancel(body.after_resize);

      body.after_resize = $timeout(() => {
        body.is_mobile();
      }, 750);
    };

    body.on_unauthorized = $scope.$on('unauthorized', (event, args) => {
      $state.go('login', { type: args.type || null, redirect: args.redirect || null });
    });

    body.on_404 = $scope.$on('404', () => {
      $state.go('page-not-found', { path: window.location.pathname.replace(/^\/+|\/+$/g, '') });
    });

    angular.element($window).on('resize', body.resize_check);

    $scope.$on('$destroy', () => {
      body.on_start();
      body.on_success();
      body.on_finish();
      body.on_unauthorized();
      angular.element($window).off('resize', body.resize_check);
    });
  }
})();
