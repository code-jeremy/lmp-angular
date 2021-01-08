(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('videoFactory', videoFactory);

  videoFactory.$inject = ['$http', '$log'];

  function videoFactory($http, $log) {
    return { getVideo };

    function getVideo( id ) {
      return $http.get(`https://api.dailymotion.com/video/${id}?fields=id,likes_total,embed_url,thumbnail_720_url,thumbnail_1080_url,title,views_total,duration,url,description&localization=detect`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
