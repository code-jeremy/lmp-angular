const tracksConfig = (type) => {
  return {
    url: `/${type}?genre&order&page`,
    parent: 'main',
    resolve: {
      songs: ['tracksFactory', '$stateParams', 'metaService', (tracksFactory, $stateParams, metaService) => {
        return tracksFactory.getMusic(type, ($stateParams.genre || false),($stateParams.order || false), ($stateParams.page || 1), false, false).then(data => {
          metaService.setProperties({
            title: `${$stateParams.page && parseInt($stateParams.page, 10) > 1 ? 'Page ' + $stateParams.page + ' | ' : ''}${format_title(type)} | LMP`,
            description: `Listen to the best latin ${type} on iamlmp.com, the number one site for latin music.`
          });

          return data;
        });
      }],
      slides: ['pageFactory', '$stateParams', (pageFactory, $stateParams) => pageFactory.getPage(type)],
      layout: ['$rootScope', ($rootScope) => $rootScope.layout]
    },
    views: {
      'content@main': {
        component: 'tracks',
        bindings: {
          songs: 'songs',
          slides: 'slides',
          layout: 'layout'
        }
      }
    }
  }
}
