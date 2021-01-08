(function() {
  'use strict';

  angular
  .module('lmp')
  .directive('lmpSlider', lmpSlider);

  function lmpSlider() {
    return {
     restrict: 'E',
     templateUrl: '/views/slider.html',
     controller: LmpSliderController,
     controllerAs: 'slider',
     scope: {
      slides: '='
    }
  };
}

LmpSliderController.$inject = ['$timeout', '$window', '$scope', '$interval'];

function LmpSliderController($timeout, $window, $scope, $interval) {
  const slider = this;
  slider.slides = $scope.slides;
  slider.direction = 'right';

  slider.set_active = (index) => {
   for(let i = 0; i < slider.slides.length; i += 1) {
    if (i == index) {
     slider.slides[i].active = true;
     slider.current = i;
   } else {
     slider.slides[i].active = false;
   }
 }
};

slider.init = () => slider.set_active(0);

slider.prev = () => {
 slider.direction = 'left';
 slider.set_active(slider.current - 1);
};

slider.next = () => {
 slider.direction = 'right';
 slider.set_active(slider.current + 1);
};

slider.timer = null;

slider.autoplay = () => {
 slider.timer = $interval(() => {
  if (slider.direction === 'right') {
   if (slider.current < (slider.slides.length - 1)) {
    slider.next();
  } else {
    slider.prev();
  }
} else {
 if (slider.current === 0) {
  slider.next();
} else {
  slider.prev();
}
}
}, 5500);
};

if (slider.slides.length > 1) $timeout(() => {
 slider.autoplay();
}, 5500);

  slider.pause = () => {
    if (angular.isDefined(slider.timer)) {
      $interval.cancel(slider.timer);
    }
  };

  slider.unpause = () => {
   if (!angular.isDefined(slider.timer) && slider.slides.length > 1) {
    slider.autoplay();
  }
};

slider.resize = () => slider.set_active(slider.current);
slider.init();
angular.element($window).on('resize', slider.resize);
slider.listen = $scope.$on('timeline', slider.init);

$scope.$on( '$destroy', () => {
 angular.element( $window ).off( 'resize', slider.resize );
 slider.listen();
});
}
})();