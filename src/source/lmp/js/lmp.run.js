(function() {
  'use strict';

  angular
    .module('lmp')
    .run(run);

  run.$inject = ['$rootScope', '$window', '$state', '$location', '$localStorage', 'authFactory', '$timeout'];

  function run($rootScope, $window, $state, $location, $localStorage, authFactory, $timeout) {
    function checkIfAnalyticsLoaded() {
      if (window.ga) {
        if (window.location.hostname === 'www.iamlmp.com') {
          window.ga('create', 'UA-3088252-2', 'auto');
        } else {
          window.ga('create', 'UA-101506024-1', 'auto');  
        }
      } else {
        // Retry. Probably want to cap the total number of times you call this.
        $timeout(checkIfAnalyticsLoaded(), 500);
      }
    }

    checkIfAnalyticsLoaded();

    $rootScope.base_url = 'https://api.iamlmp.com/wp-json';
    $localStorage.queue = $localStorage.queue || [];
    $localStorage.view_track = $localStorage.view_track || false;
    $localStorage.playlist = $localStorage.playlist || [];
    $localStorage.playlist_track = false;
    $localStorage.share = null;
    $localStorage.loading = null;
    $localStorage.state = 'idle';

    if ($localStorage.current) {
      $localStorage.current.playing = false;
    }

    if ($location.hash() && $location.hash().indexOf('access_token') > -1) {
      const parts = $location.hash().split('&');
      let access_token, expires_in;

      for (let i = 0; i < parts.length; i += 1) {
        let values = parts[i].split('=');

        switch(values[0]) {
          case 'access_token':
            if (values[1]) access_token = values[1];
          break;
          case 'expires_in':
            if (values[1]) expires_in = parseInt(values[1], 10);
          break;
          default:
        }
      }

      $window.location.hash = '';

      if (access_token && expires_in) {
        const auth = {
          access_token,
          expires_in,
          token_created: authFactory.timenow(),
        };

        authFactory.profile(auth).then((res) => {
          // 
        });
      }
    }

    // Clean up legacy storage items
    if ($localStorage.access_token) {
      delete $localStorage.access_token;
    }

    if ($localStorage.autn) {
      delete $localStorage.autn;

      if ($localStorage.profile) {
        delete $localStorage.profile;
      }

      $state.reload();
    }
  }
})();
