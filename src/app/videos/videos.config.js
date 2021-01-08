const videosConfig = () => {
  return {
    url:'/videos?page',
    parent: 'main',
    resolve: {
      content: ['videosFactory', '$stateParams', 'metaService', function(videosFactory, $stateParams, metaService) {
        return videosFactory.getVideos($stateParams.page || 1).then(data => {
          metaService.setProperties({
            title: 'Videos | LMP'
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'videos',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
