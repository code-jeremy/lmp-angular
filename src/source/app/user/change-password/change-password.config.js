const changePasswordConfig = () => {
  return {
    url: '/change-password',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      meta: ['metaService', (metaService) => metaService.setProperties({
        title: 'Change Password | LMP'
      })]
    },
    views: {
      'content@main': {
        component: 'changePassword',
      }
    }
  }
}