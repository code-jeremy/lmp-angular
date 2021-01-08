(function() {
  'use strict';

  angular
  .module('lmp')
  .component('frontPage', {
    bindings: {
      content: '<',
      featured: '<',
      caliente: '<'
    },
    controller: ['$localStorage', function($localStorage) {
      this.$onInit = () => {
        this.slide_tracks = [];

        if (this.content.slider) {
          for (let i = 0; i < this.content.slider.length; i += 1) {
            if (this.content.slider[i].track) {
              this.slide_tracks.push(this.content.slider[i].track);
            }
          }
        }

        this.featured_tracks = [];

        for (let i = 0; i < this.featured.length; i += 1) {
          if (this.featured[i].type === 'music') {
            this.featured_tracks.push(this.featured[i].content);
          }
        }
        
        $localStorage.queue = [ ...this.slide_tracks, ...this.featured_tracks, ...this.caliente ];
        this.ready = true;
      }
    }],
    templateUrl: '/views/home.html',
  });
})();
