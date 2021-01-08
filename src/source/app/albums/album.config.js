const albumConfig = () => {
  return {
    url: '/albums/:albumSlug',
    parent: 'main',
    resolve: {
      content: ['albumFactory', '$stateParams', 'metaService', (albumFactory, $stateParams, metaService) => {
        return albumFactory.getAlbums(false, $stateParams.albumSlug).then(data => {
          metaService.setProperties({
            title: `${data.title} | EnVivo | LMP`,
            image: data.artwork_large
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'album',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
