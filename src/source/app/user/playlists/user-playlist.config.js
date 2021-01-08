const userPlaylistConfig = () => {
  return {
    url: '/my-playlists/:slug',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      content: ['playlistFactory', '$stateParams', 'metaService', (playlistFactory, $stateParams, metaService) => {
        return playlistFactory.getPlaylist($stateParams.slug).then(data => {
          metaService.setProperties({
            title: `${data.title} | My Playlists | LMP`,
            robots: 'noindex'
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'userPlaylist',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}