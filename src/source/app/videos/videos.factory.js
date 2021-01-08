(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('videosFactory', videosFactory);

  videosFactory.$inject = ['$http', '$log'];

  function videosFactory($http) {
    return { getVideos };

    function getVideos(page) {
      return $http.get(`https://api.dailymotion.com/videos?user=LOMAXIMOPRODUCTIONS&limit=9&page=${page}`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
