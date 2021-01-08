const artistsConfig = (type) => {
  return {
    url: `/${type}?page`,
    parent: 'main',
    resolve: {
      content: ['actsFactory', '$stateParams', 'metaService', function(actsFactory, $stateParams, metaService) {
        return actsFactory.getActs(type, ($stateParams.page || 1)).then(data => {
          metaService.setProperties({
            title: `${$stateParams.page && parseInt($stateParams.page, 10) > 1 ? 'Page ' + $stateParams.page + ' | ' : ''}DJs' | LMP`,
            description: `Find your favorite ${type} exclusively on LMP, the best site for latin music.`
          });

          return data;
        });
      }],
      type: () => type
    },
    views: {
      'content@main': {
        component: 'artists',
        bindings: {
          songs: 'content',
          type: 'type'
        }
      }
    }
  }
}
