const ordersConfig = () => {
  return {
    url: '/my-orders',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      list: ['ordersFactory', 'metaService', (ordersFactory, metaService) => {
        return ordersFactory.getOrders().then(data => {
          metaService.setProperties({
            title: 'My Orders | LMP',
            robots: 'noindex'
          });

          return data;
        })
      }],

    },
    views: {
      'content@main': {
        component: 'orders',
        bindings: {
          list: 'list'
        }
      }
    }
  };
}