(function() {
  'use strict';

  angular
  .module('lmp')
  .directive('lmpForm', lmpForm);

  function lmpForm() {
    return {
      restrict: 'E',
      scope: {
        data: '=form'
      },
      controller: FormController,
      controllerAs: 'lmp_form',
      templateUrl: '/views/form.html'
    };
  }

  FormController.$inject = ['formFactory', '$scope', '$timeout', 'vcRecaptchaService'];

  function FormController(formFactory, $scope, $timeout, vcRecaptchaService) {
    const lmp_form = this;
    lmp_form.data = $scope.data;

    lmp_form.setWidgetId = (widgetId) => lmp_form.id = widgetId;

    lmp_form.submit_form = (index) => {
      if (!lmp_form.data.recaptcha) {
        lmp_form.message = 'Please verify you are human';
        return;
      }

      if (lmp_form.message) lmp_form.message = null;

      for (let i = 0; i < lmp_form.data.fields.length; i += 1) {
        if (!lmp_form.data.fields[i].value) {
          if (!lmp_form.message) {
            lmp_form.message = '<p>Please complete the following fields: </p><ul>';
          }
      
          lmp_form.message = `${lmp_form.message}<li>${lmp_form.data.fields[i].label}</li>`; 
        }

        if (i === (lmp_form.data.fields.length - 1) && lmp_form.message) {
          lmp_form.message += '</ul>';
        }
      }

      if (!lmp_form.message) {
        lmp_form.loading = true;
      
        formFactory.postMessage(lmp_form.data).then(res => {
          $timeout(() => {
            lmp_form.data.recaptcha = null;
            
            if (response.status) {
              for(let i = 0; i < lmp_form.data.fields.length; i += 1) {
                lmp_form.data.fields[i].value = null;
              }
            }

            vcRecaptchaService.reload(lmp_form.id);
            lmp_form.message = response.message ? response.message : response.status ? 'Your message has been sent. Thankyou.' : 'Sorry, something went wrong. Please try again.';
            lmp_form.loading= false;
          });
        });
      }
    };
  }
})();
