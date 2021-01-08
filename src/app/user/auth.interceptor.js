(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('authInjector', ['$localStorage', ($localStorage) => {  
    var authInjector = {
      request: function(config) {
        let proceed = true;
        const ignore = [
          'dailymotion',
          'lmp-api/v1/navigation',
          'lmp-api/v1/artists',
          'lmp-api/v1/posts'
        ];

        for (let i = 0; i < ignore.length; i += 1) {
          if (config.url.indexOf(ignore[i]) > -1) {
            proceed = false;
          }
        }

        if (proceed) {
          let auth = localStorage.getItem('iamlmp_auth');
          auth = JSON.parse(auth);

          if (auth && auth.access_token) {
            config.headers.Authorization = `Bearer ${auth.access_token}`;
          }
        }

        return config;
      }
    };

    return authInjector;
  }]);
})();
