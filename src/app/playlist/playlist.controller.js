(function() {
  'use strict';

  angular
    .module('app')
    .controller('PlaylistController', PlaylistController);

    PlaylistController.$inject = ['playlistService'];

  /** @ngInject */
  function PlaylistController(playlistService) {
    var vm = this;
    vm.playlists = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getPlaylists();
    }

    function getPlaylists() {
      return playlistService.all()
        .then(getPlaylistsComplete, requestFailed);
    }

    function getPlaylistsComplete(data) {
      vm.playlists = data;
    }

    function requestFailed(err) {
      console.log('err', err);
    }


  }
})();
