(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('submitCommentFactory', submitCommentFactory);

  submitCommentFactory.$inject = ['$http', '$rootScope', '$log'];

  function submitCommentFactory($http, $rootScope, $log) {
    return { postComment };

    function postComment(comment) {
      return $http.post(`${$rootScope.base_url}/wp/v2/comments`, comment)
      .then(res => res.data)
      .catch(err => $log.debug(err));
    }
  }
})();
