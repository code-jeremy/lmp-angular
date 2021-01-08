(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('userFactory', userFactory);

  userFactory.$inject = ['$http', '$localStorage', '$rootScope', '$log'];

  function userFactory($http, $localStorage, $rootScope, $log) {
    return { getUser, updateUser };

    function getUser(edit) {
      edit = edit || false;
  
      return $http.get(`${$rootScope.base_url}/wp/v2/users/me?${edit ? 'context=edit&' : ''}_envelope`)
        .then(res => {
          if (res.status !== 200) return false;
          if (!edit) $localStorage.profile = res.data.body;
          return res.data.body;
        })
        .catch(err => $log.debug(err));
    }

    function updateUser(profile) {
      return $http.post(`${$rootScope.base_url}/wp/v2/users/${profile.id}`, profile )
        .then(res => res.body.data)
        .catch(err => $log.debug(err));
    }
	}
})();
