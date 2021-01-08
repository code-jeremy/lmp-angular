const userPlaylistsConfig = () => {
  return {
    url: '/my-playlists',
    parent: 'main',
    resolve: { 
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      meta: ['metaService', (metaService) => metaService.setProperties({
        title: 'My Profile | LMP',
        robots: 'noindex'
      })],
      playlists: ['userPlaylistsFactory', (userPlaylistsFactory) => userPlaylistsFactory.getList()]
    },
    views: {
      'content@main': {
        component: 'userPlaylists',
        bindings: {
          playlists: 'playlists'
        }
      }
    }
  };
}
