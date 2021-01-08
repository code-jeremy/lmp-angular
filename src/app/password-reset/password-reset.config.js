const passwordResetConfig = () => {
  return {
    url:'/password-reset?key&login',
    parent: 'main',
    resolve: {
      meta: ['metaService', (metaService) => metaService.setProperties({
        title: 'Password Reset | LMP'
      })]
    },
    views: {
      'content@main': {
        component: 'passwordReset'
      }
    }
  }
}
