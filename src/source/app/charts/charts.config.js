const chartsConfig = () => {
  return {
    url: '/charts?page',
    parent: 'main',
    resolve: {
      content: ['chartsFactory', '$stateParams', 'metaService', (chartsFactory, $stateParams, metaService) => {
        return chartsFactory.getCharts(($stateParams.page || 1)).then(data => {
          metaService.setProperties({
            title: `Charts | LMP`,
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'charts',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}