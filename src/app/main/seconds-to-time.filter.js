(function() {
  'use strict';

  angular
  .module('lmp' )
  .filter('seconds_to_time', seconds_to_time);

  seconds_to_time.$inject = ['$filter'];

  function seconds_to_time($filter) {
    return function(seconds) {
      seconds = $filter('date')(new Date(0, 0, 0).setSeconds(seconds), 'HH:mm:ss').toString();

      if(seconds.substring(0, 3) === '00:') {
        seconds = seconds.substring(3);
      }
    
      return seconds;
    };
  }
})();
