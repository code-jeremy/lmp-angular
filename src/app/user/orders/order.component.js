(function() {
  'use strict';

  angular
  .module('lmp')
  .component('order', {
    bindings: {
      data: '<'
    },
    controller: ['orderFactory', 'cancelSubFactory', '$timeout', 'authFactory', '$state', '$stateParams', '$localStorage', '$location', function(orderFactory, cancelSubFactory, $timeout, authFactory, $state, $stateParams, $localStorage, $location) {
      this.$onInit = () => {
        if ($location.search()['paypal-return']) {
          switch ($location.search()['paypal-return']) {
            case 'cancel-checkout':
              this.message = `<p>If you want to cancel this order please click the cancel button below.</p><p>If you don't want to cancel you can come back here at any time to complete the checkout process by clicking the checkout button below.</p>`;
            break;
            case 'complete':
              if (this.data.subscription_status === 'active') {
                this.status = true;
                this.message = `<p>Thanks for subscribing to the record pool! Please see below for links to download the app.</p>`;
              } else {
                this.message = `<p>Your subscription is not yet active. Please see below for available actions.</p>`;
              }
            break;
            case 'incomplete':
              this.message = `<p>Your subscription is not yet active. Please see below for available actions.</p>`;
            break;
          }
        }
      }

      this.cancel = () => {
        cancelSubFactory.cancel(this.data.order_id).then(res => $timeout(() => {
          zenscroll.to(document.body, 300);
          this.message = res.message;
          this.status = res.status;

          if (res.status) {
            orderFactory.getOrder(this.data.order_id).then(res => $timeout(() => {
              this.data = res;
            }));
          }
        }));
      }
    }],
    templateUrl: '/views/order.html'
  });
})();
