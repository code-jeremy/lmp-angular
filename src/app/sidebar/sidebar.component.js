(function() {
  'use strict';

  angular
  .module('lmp')
  .component('sidebar', {
    controller: ['sidebarFactory', '$localStorage', 'lmpPlayer', function(sidebarFactory, $localStorage, lmpPlayer) {
      const sidebar = this;
      sidebarFactory.getSidebar().then(res => {
        this.mixes = res.mixes;
        this.tracks = res.tracks;
      });

      this.play_radio = () => {
        if ($localStorage.state === 'playing' && $localStorage.current.id === 'lmp-radio') {
          return lmpPlayer.pause();
        }
        
        lmpPlayer.find_track('lmp-radio');
      };
    }],
    templateUrl: '/views/sidebar.html',
  });
})();
