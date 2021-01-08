(function() {
  'use strict';

  angular
  .module('lmp')
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$localStorageProvider', '$sceDelegateProvider', '$provide', '$logProvider', '$compileProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $localStorageProvider, $sceDelegateProvider, $provide, $logProvider, $compileProvider) {
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
    $logProvider.debugEnabled(false);
    $provide.decorator('$log', ['$delegate', ($delegate) => {
      $delegate.warn = $delegate.info = $delegate.error = $delegate.debug = angular.noop;
      return $delegate;
    }]);

    $localStorageProvider.setKeyPrefix('iamlmp_');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('page');

    $urlRouterProvider.rule(($injector, $location) => {
      const path = $location.path();
      const hasTrailingSlash = path[path.length-1] === '/';

      if (hasTrailingSlash) {
        return path.substr(0, path.length - 1); 
      } 
    });

    $stateProvider
    .state('main', mainConfig())
    .state('home', homeConfig())
    .state('albums', albumsConfig())
    .state('album', albumConfig())
    .state('track', trackConfig('tracks'))
    .state('tracks', tracksConfig('tracks'))
    .state('mix', trackConfig('mixes'))
    .state('mixes', tracksConfig('mixes'))
    .state('mixtape', trackConfig('mixtapes'))
    .state('mixtapes', tracksConfig('mixtapes'))
    .state('live-track', trackConfig('live-tracks'))
    .state('live-tracks', tracksConfig('live-tracks'))
    .state('chart', chartConfig())
    .state('charts', chartsConfig())
    .state('podcast', podcastConfig())
    .state('podcasts', podcastsConfig())
    .state('artist', artistConfig('artists'))
    .state('artists', artistsConfig('artists'))
    .state('djs', artistsConfig('djs'))
    .state('dj', artistConfig('djs'))
    .state('playlist', playlistConfig())
    .state('article', articleConfig())
    .state('news', newsConfig())
    .state('videos',videosConfig())
    .state('queue', queueConfig())
    .state('password-reset', passwordResetConfig())
    .state('login', loginConfig())
    .state('user-change-password', changePasswordConfig())
    .state('user-account', accountConfig())
    .state('user-profile', profileConfig())
    .state('user-playlist', userPlaylistConfig())
    .state('user-playlists', userPlaylistsConfig())
    .state('user-favorites', favoritesConfig())
    .state('user-order', orderConfig())
    .state('user-orders', ordersConfig())
    // .state('user-order-status', account_config('order-status'))
    .state('user-review-order', reviewOrderConfig())
    .state('user-checkout', checkoutConfig())
    .state('record-pool-device', recordPoolDeviceConfig())
    .state('contact', pageConfig(true))
    .state('page', pageConfig())
    .state('page-not-found', pageNotFoundConfig());

    $httpProvider.interceptors.push('authInjector');
    $httpProvider.interceptors.push('errorInjector');
    $httpProvider.defaults.useXDomain = true;

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '*://www.iamlmp.com/**',
      '*://lmp-api.circular.one/**',
      '*://lmp-api.dev/**',
      new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
      new RegExp('^(http[s]?):\/\/(w{3}.)?vimeo\.com/.+$'),
      new RegExp('^(http[s]?):\/\/(w{3}.)?dailymotion\.com/.+$'),
      new RegExp('^(http[s]?):\/\/(w{3}.)?domint\.net/.+$'),
      new RegExp('^(http[s]?):\/\/(w{3}.)?p.jwpcdn\.com/.+$'),
      new RegExp('^(http[s]?):\/\/(w{3}.)?jwpsrv\.com/.+$'),
    ]);
  }
})();
