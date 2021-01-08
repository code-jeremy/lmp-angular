(function() {
  'use strict';

  angular
  .module('lmp')
  .component('page', {
    bindings: {
      content: '<',
      plan: '<'
    },
    controller: ['authFactory', '$timeout', '$sce', 'metaService', 'productsFactory', 'orderFactory', '$state', '$location', function(authFactory, $timeout, $sce, metaService, productsFactory, orderFactory, $state, $location) {

      this.$onInit = () => {
        if (this.content.elements) {
          for (let i = 0; i < this.content.elements.length; i += 1) {
            if (!this.content.elements[i].type) {
              this.content.elements[i] = $sce.trustAsHtml(this.content.elements[i]);
            }
          }
        }

        if (this.content.title === 'Record Pool') {
          productsFactory.getProducts().then((res) => {
            this.products = res;
          });
        }

        if (this.plan) this.select_plan = this.plan;
      }

      this.buy_now = (product_id, variation_id) => {
        const params = { 
          product_id: product_id,
          variation_id: variation_id || null
        };

        $state.go('user-review-order', params);
      }
    }],
    templateUrl: '/views/page.html'
  });
})();
