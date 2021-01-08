(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('newsFactory', newsFactory);

  newsFactory.$inject = ['$http', '$rootScope', '$log'];

  function newsFactory($http, $rootScope, $log) {
    return { getNews };

    function getNews(page) {
     return $http.get(`${$rootScope.base_url}/lmp-api/v1/posts?per_page=10&page=${page}`)
      .then(res => {
        return {
          pages: res.headers('X-WP-TotalPages'),
          page: page,
          list: res.data
        };
      })
      .catch(err => $log.debug(err));
    }
  }
})();
