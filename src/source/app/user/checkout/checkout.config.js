const checkoutConfig = () => {
  return {
    url: '/checkout?product_id&variation_id&coupon_code',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      order: ['createOrderFactory', '$stateParams', 'metaService', (createOrderFactory, $stateParams, metaService) => {
        return createOrderFactory.createOrder($stateParams.product_id, $stateParams.variation_id, $stateParams.coupon_code).then(data => {
          metaService.setProperties({
            title: 'Checkout | LMP',
            robots: 'noindex'
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'checkout',
        bindings: {
          order: 'order'
        }
      }
    }
  };
}
