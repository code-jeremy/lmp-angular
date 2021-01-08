const podcastsConfig = () => {
  return {
    url:'/podcasts?genre&order&page',
    parent: 'main',
    resolve: {
      songs: [ 'tracksFactory', '$stateParams', 'metaService', function(tracksFactory, $stateParams, metaService) {
        return tracksFactory.getMusic('podcasts', ($stateParams.genre || false),($stateParams.order || false), ($stateParams.page || 1), false, 9).then(data => {
          metaService.setProperties({
            title: `${$stateParams.page && parseInt($stateParams.page, 10) > 1 ? 'Page ' + $stateParams.page + ' | ' : ''}Podcasts | LMP`,
            description: 'Listen to the best latin music podcasts on the web, presented by LMP, the number one site for latin mixes, remixes and mixtapes.',
            keywords: 'podcast, latin podcast, latin music podcast, latin podcast rss'
          });

          return data;
        });
      }],
    },
    views: {
      'content@main': {
        component: 'podcasts',
        bindings: {
          songs: 'songs'
        }
      }
    }
  }
}
