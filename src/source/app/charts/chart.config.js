const chartConfig = () => {
  return {
    url: '/charts/:slug',
    parent: 'main',
    resolve: {
      content: ['chartFactory', '$stateParams', 'metaService', (chartFactory, $stateParams, metaService) => {
        return chartFactory.getChart($stateParams.slug).then(data => {
          metaService.setProperties({
            title: `${data.title} | Charts | LMP`,
            image: data.artwork_large
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'chart',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
