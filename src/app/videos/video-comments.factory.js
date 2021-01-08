(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('videoCommentsFactory', videoCommentsFactory);

  videoCommentsFactory.$inject = ['$http', '$log'];

  function videoCommentsFactory($http, $log) {
    return { getComments };

    function getComments(id) {
      return $http.get(`https://api.dailymotion.com/video/${id}/comments`)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
