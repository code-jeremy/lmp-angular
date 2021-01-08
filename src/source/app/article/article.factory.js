(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('articleFactory', articleFactory);

  articleFactory.$inject = ['$http', '$rootScope', '$log'];

  function articleFactory( $http, $rootScope, $log) {
    return { getArticle };

    function getArticle( slug ) {
      return $http.get(`${$rootScope.base_url}/lmp-api/v1/posts?slug=${slug}`)
      .then(res => res.data[0])
      .catch(err => $log.debug(err));
    }

  }

})();
