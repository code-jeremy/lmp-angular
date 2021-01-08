const favoritesConfig = () => {
  return {
    url: '/my-favorites?page',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      meta: ['metaService', '$stateParams', (metaService, $stateParams) => metaService.setProperties({
        title: `${$stateParams.page && parseInt($stateParams.page, 10) > 1 ? 'Page ' + $stateParams.page + ' | ' : ''}My Favorites | LMP`,
        robots: 'noindex'
      })],
      data: ['favoritesFactory', '$stateParams', function(favoritesFactory, $stateParams) {
        return favoritesFactory.getFavorites($stateParams.page || false);
      }]
    },
    views: {
      'content@main': {
        component: 'favorites',
        bindings: {
          data: 'data'
        }
      }
    }
  }
}