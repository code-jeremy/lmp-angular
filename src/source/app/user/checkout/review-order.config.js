const reviewOrderConfig = () => {
  return {
    url: '/review-order?product_id&variation_id',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      meta: ['metaService', (metaService) => {
        return metaService.setProperties({
          title: 'Review Order | LMP',
          robots: 'noindex'
        });
      }],
      product: ['productFactory', '$stateParams', (productFactory, $stateParams) => {
        return productFactory.getProduct($stateParams.product_id, $stateParams.variation_id);
      }],
    },
    views: {
      'content@main': {
        component: 'reviewOrder',
        bindings: {
          product: 'product'
        }
      }
    }
  };
}