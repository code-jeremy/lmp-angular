(function() {
  'use strict';

  angular
  .module('lmp')
  .component('device', {
    bindings: {
      content: '<',
      device: '<'
    },
    controller: ['$timeout', 'changeDeviceFactory', function($timeout, changeDeviceFactory) {
      const ctrl = this;

      ctrl.change_device = swap => changeDeviceFactory.change(swap).then(res => {
        ctrl.message = res.message;

        if (res.action) {
          switch (res.action) {
            case 'swap':
              ctrl.device.platform = res.platform;
              ctrl.device.new_machine = null;
            break;
            case 'remove':
              ctrl.device.platform = null;
            break;
          }
        }
      });
    }],
    templateUrl: '/views/device.html'
  });
})();
