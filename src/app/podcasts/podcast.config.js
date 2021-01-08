const podcastConfig = () => {
  return {
    url:'/podcasts/:slug',
    parent: 'main',
    resolve: {
      content: ['metaService', 'trackFactory', '$stateParams', (metaService, trackFactory, $stateParams) => {
        return trackFactory.getTrack('podcasts', $stateParams.slug).then(data => {
          metaService.setProperties({
            title: `${data.title} | Podcasts | LMP`
          });

          return data;
        });
      }],
    },
    views: {
      'content@main': {
        component: 'podcast',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
