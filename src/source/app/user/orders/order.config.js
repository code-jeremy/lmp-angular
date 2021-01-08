const orderConfig = () => {
  return {
    url: '/my-orders/:orderId',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      data: ['orderFactory', '$stateParams', 'metaService', (orderFactory, $stateParams, metaService) => {
        return orderFactory.getOrder($stateParams.orderId).then(data => {
          metaService.setProperties({
            title: `Order # ${$stateParams.orderId} | My Orders | LMP`,
            robots: 'noindex'
          });

          return data;
        })
      }]
    },
    views: {
      'content@main': {
        component: 'order',
        bindings: {
          data: 'data'
        }
      }
    }
  };
}