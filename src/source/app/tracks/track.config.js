const trackConfig = (type) => {
  return {
    url: `/${type}/:slug`,
    parent: 'main',
    resolve: {
      content: ['metaService', 'trackFactory', '$stateParams', (metaService, trackFactory, $stateParams) => {
        return trackFactory.getTrack(type, $stateParams.slug).then(data => {
          metaService.setProperties({
            title: `${data.title} | ${format_title(type)} | LMP`,
            image: data.artwork_large
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'track',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
