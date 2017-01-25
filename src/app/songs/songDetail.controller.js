(function() {
  'use strict';

  angular
    .module('app')
    .controller('SongDetailController', SongDetailController);

    SongDetailController.$inject = ['$stateParams', 'songService'];

  /** @ngInject */
  function SongDetailController($stateParams, songService) {
    var vm = this;
    vm.song = null;

    var songId = $stateParams.songId;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getSong();
    }

    function getSong(id) {
      return songService.findById(songId)
        .then(getSongComplete, requestFailed);
    }

    function getSongComplete(data) {
      vm.song = data;
    }

    function requestFailed(err) {
      console.log('err', err);
    }

  }
})();
