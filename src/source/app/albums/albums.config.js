const albumsConfig = () => {
  return {
    url: '/albums?page',
    parent: 'main',
    resolve: {
      content: ['albumFactory', '$stateParams', 'metaService', (albumFactory, $stateParams, metaService) => {
        return albumFactory.getAlbums($stateParams.page || 1).then(data => {
          metaService.setProperties({
            title: `${$stateParams.page && parseInt($stateParams.page, 10) > 1 ? 'Page ' + $stateParams.page + ' | ' : ''}En Vivo | LMP`,
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'albums',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
