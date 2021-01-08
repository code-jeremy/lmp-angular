(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('errorInjector', ['$rootScope', ($rootScope) => {  
    const errorInjector = {
      responseError: function(res) {
        console.log(res);
        switch (res.status) {
          case 404:
            $rootScope.$broadcast('404');
            break;
        }
        
        return res;
      }
    };

    return errorInjector;
  }]);
})();
