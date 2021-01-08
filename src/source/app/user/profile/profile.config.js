const profileConfig = () => {
  return {
    url: '/my-profile',
    parent: 'main',
    resolve: { 
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      profile: ['authFactory', (authFactory) => authFactory.profileFull()],
      meta: ['metaService', (metaService) => metaService.setProperties({
        title: 'My Profile | LMP',
        robots: 'noindex'
      })]
    },
    views: {
      'content@main': {
        component: 'profile',
        bindings: {
          profile: 'profile'
        }
      }
    }
  };
}