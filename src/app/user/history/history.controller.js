(function() {
  'use strict';

  angular
  .module('lmp')
  .controller('HistoryController', HistoryController);

  HistoryController.$inject = ['songs', '$localStorage'];

  function HistoryController(songs, $localStorage) {
    const history = this; 
    history.tracks = songs.content;
    history.storage = $localStorage;
    history.page = songs.page;
    history.pages = songs.pages;
    history.storage.queue = history.storage.queue.concat(history.tracks);
  }
})();
