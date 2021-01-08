(function() {
  'use strict';

  angular
  .module('lmp')
  .component('passwordReset', {
    controller: ['authFactory', '$timeout', '$rootScope', '$stateParams', 'newPasswordFactory', function(authFactory, $timeout, $rootScope, $stateParams, newPasswordFactory) {
      this.$onInit = () => {
        if ($stateParams.key && $stateParams.login) {
          this.new_password = true;
          this.message = '<p>Enter a new password below.</p>';
        } else {
          this.message = '<p>Enter your username or email address to receive a password reset link.</p>';
        }
      }

      this.reset_password = () => {
        $rootScope.layout.loading = true;

        authFactory.reset(this.username).then(res => {
          this.message = res.message
          $rootScope.layout.loading = false;
        });
      }

      this.set_password = () => {
        this.message = null;

        $timeout(() => {
          if (this.password && this.password.length < 6) {
            return this.message = '<p>Your password is too short. Enter at least 6 characters.</p>';
          }

          if (!this.password || !this.password_duplicate) {
            return this.message = '<p>You must complete both password fields.</p>';
          }

          if (this.password !== this.password_duplicate) {
            return this.message = '<p>Passwords don\'t match.</p>';
          }

          newPasswordFactory.reset($stateParams.key, $stateParams.login, this.password).then(res => {
            if (!res.status) {
              return this.message = res.message;
            }

            this.password = this.password_duplicate = '';
            return this.message = res.message;
          });
        });
      }
    }],
    templateUrl: '/views/password-reset.html'
  });
})();
