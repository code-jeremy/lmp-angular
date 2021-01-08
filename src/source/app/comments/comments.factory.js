(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('commentsFactory', commentsFactory);

  commentsFactory.$inject = ['$http', '$rootScope', '$log'];

  function commentsFactory($http, $rootScope, $log) {
    return { getComments };

    function getComments(id, page) {
    return $http.get(`${$rootScope.base_url}/wp/v2/comments/?post=${id}&per_page=5&page=${(page || 1)}`)
    .then(res => {
      return {
        page: parseInt(page, 10),
        pages: parseInt(res.headers('X-WP-TotalPages'), 10),
        total: parseInt(res.headers('X-WP-Total'), 10),
        list: res.data
      };
    })
    .catch(err => $log.debug(err));
    }
  }
})();
