(function() {
  'use strict';

  angular
  .module('lmp')
  .directive('socialShare', socialShare);

  function socialShare() {
    return {
      restrict: 'E',
      templateUrl: '/views/social-share.html',
      controller: SocialShareController,
      controllerAs: 'social_share',
      scope: {}
    };
  }

  SocialShareController.$inject = ['$timeout', 'Socialshare', '$localStorage'];

  function SocialShareController($timeout, Socialshare, $localStorage) {
    const social_share = this;
    social_share.storage = $localStorage;

    social_share.share = (type) => {
      const title = `${social_share.storage.share.title} @ LMP`;

      switch(type) {
        case 'facebook':
        case 'twitter':
          Socialshare.share({
            'provider': type,
            'attrs': {
              'socialshareUrl': social_share.storage.share.link,
              'socialshareText': title
            }
          });
          break;
          case 'email':
            Socialshare.share({
              'provider': 'email',
              'attrs': {
                'socialshareSubject': 'Check this out on iamlmp.com',
                'socialshareBody': `I saw this on iamlmp.com and thought you\'d like it: "${social_share.content.title}" - ${social_share.content.link}`
              }
            });
          break;
      }
    };

    social_share.close = () => $timeout(() => {	
      social_share.storage.share = null;
    });
	}
})();