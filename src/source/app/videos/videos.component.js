(function() {
  'use strict';

  angular
  .module('lmp')
  .component('videos', {
    bindings: {
      content: '<'
    },
    controller: ['$timeout', 'videoFactory', '$sce', 'videoCommentsFactory', function($timeout, videoFactory, $sce, videoCommentsFactory) {
      this.list = [];
      this.current = 0;

      this.$onInit = () => {
        this.pages = this.content.has_more ? this.content.page + 1 : this.content.page;
        this.page = this.content.page;

        for (let i = 0; i < this.content.list.length; i += 1) {
          videoFactory.getVideo(this.content.list[i].id).then(res => {
            res.embed_url = $sce.trustAsResourceUrl(`${res.embed_url.replace('http:', '')}?autoplay=1&ui-highlight=ba4d3d&ui-logo=false`);
      
            if (res.thumbnail_720_url) {
              res.thumbnail_720_url = res.thumbnail_720_url.replace('http:', '');
            }
      
            if (res.thumbnail_1080_url) {
              res.thumbnail_1080_url = res.thumbnail_1080_url.replace('http:', '');
            }

            this.list.push(res);
          });
        }
      }

      this.play_video = (index) => {
        this.comments = false;

        $timeout(() => {
          this.current = index;
          videoCommentsFactory.getComments(this.list[index].id).then(res => {
            this.comments = res;
          });
        });
      }
    }],
    templateUrl: '/views/videos.html'
  });
})();
