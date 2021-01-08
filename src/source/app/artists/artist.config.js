const artistConfig = (type) => {
  return {
    url: `/${type}/:slug?order&page`,
    parent: 'main',
    resolve: {
      content: ['actFactory', '$stateParams', 'metaService', function(actFactory, $stateParams, metaService) {
        return actFactory.getAct(type, $stateParams.slug).then(data => {
          metaService.setProperties({
            title: `${data.title} | ${type === 'djs' ? 'DJs' : 'Artists'} | LMP`,
            description: `Listen to tracks by ${data.title} exclusively on iamlmp.com, the number one site for latin music.`,
            image: data.artwork_large,
            ldjson: data.ldjson
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'artist',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
