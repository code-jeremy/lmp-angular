const loginConfig = () => {
  return {
    url:'/login',
    parent: 'main',
    params: {
      type: null,
      redirect: null
    },
    resolve: {
      meta: ['metaService', (metaService) => metaService.setProperties({
        title: 'Login | LMP',
      })]
    },
    views: {
      'content@main': {
        component: 'login'
      }
    }
  }
}
