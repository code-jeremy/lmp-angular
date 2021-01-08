const playlistConfig = () => {
  return {
    url:'/playlists/:slug',
    parent: 'main',
    resolve: {
      content: ['playlistFactory', '$stateParams', 'metaService', function(playlistFactory, $stateParams, metaService) {
        return playlistFactory.getPlaylist($stateParams.slug).then(data => {
          metaService.setProperties({
            title: `${data.title} | Playlists | LMP`
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'publicPlaylist',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
