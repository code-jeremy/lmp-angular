const pageConfig = (contact) => {
  return {
    url: contact ? '/contact?plan' : '/*path',
    parent: 'main',
    resolve: {
      content: ['pageFactory', 'metaService', (pageFactory, metaService) => {
        var paths = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
        return pageFactory.getPage(paths[(paths.length - 1)]).then(data => {
          metaService.setProperties({
            title: `${data.title} | LMP`
          });

          return data;
        });
      }],
      plan: ['$stateParams', ($stateParams) => $stateParams.plan || false]
    },
    views: {
      'content@main': {
        component: 'page',
        bindings: {
          content: 'content',
          plan: 'plan'
        }
      }
    }
  }
}
