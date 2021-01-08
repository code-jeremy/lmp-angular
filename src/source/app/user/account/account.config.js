const accountConfig = () => {
  return {
    url: '/my-account',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      meta: ['metaService', (metaService) => metaService.setProperties({
        title: 'My Account | LMP',
        robots: 'noindex'
      })]
    },
    views: {
      'content@main': {
        component: 'account'
      }
    }
  }
}