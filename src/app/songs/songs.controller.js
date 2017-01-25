(function() {
  'use strict';

  angular
    .module('app')
    .controller('SongController', SongController);

    SongController.$inject = ['songService'];

  /** @ngInject */
  function SongController(songService) {
    var vm = this;
    vm.songs = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getSongs();
    }

    function getSongs() {
      return songService.all()
        .then(getSongsComplete, requestFailed);
    }

    function getSongsComplete(data) {
      vm.songs = data;
    }

    function requestFailed(err) {
      console.log('err', err);
    }


  }
})();
