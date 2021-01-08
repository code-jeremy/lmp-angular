const mainConfig = () => {
  return {
    abstract: true,
    resolve: {
      navigation: ['menuFactory', (menuFactory) => menuFactory.getMenu()],
      layout: ['$rootScope', ($rootScope) => $rootScope.layout]
    },
    views: {
      'layout' : {
        component: 'layout',
        bindings: {
          navigation: 'navigation',
          layout: 'layout'
        }
      }
    }
  }
}
