(function() {
  'use strict';

  const $buoop = {
    vs:{
      i:10,
      f:-4,
      o:-4,
      s:8,
      c:-4
    },
    api:4
  }; 

  const $buo_f = () => { 
    var e = document.createElement('script'); 
    e.src = '//browser-update.org/update.min.js'; 
    document.body.appendChild(e);
  };

  try {
    document.addEventListener('DOMContentLoaded', $buo_f, false);
  } catch(e) {
    window.attachEvent('onload', $buo_f);
  }
})();
