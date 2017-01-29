(function() {
  'use strict';

  angular
    .module('app')
    .controller('PlaylistDetailController', PlaylistDetailController);

    PlaylistDetailController.$inject = ['$stateParams', 'playlistService'];

  /** @ngInject */
  function PlaylistDetailController($stateParams, playlistService) {
    var vm = this;
    vm.playlist = null;
    vm.songs = null;

    var playlistId = $stateParams.playlistId;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getPlaylist(playlistId);
      getPlaylistSongs(playlistId);
    }

    function getPlaylist(id) {
      return playlistService.findById(id)
        .then(getPlaylistComplete, requestFailed);
    }

    function getPlaylistComplete(data) {
      vm.playlist = data;
    }

    function getPlaylistSongs(id) {
      return playlistService.getPlaylistSongs(id)
        .then(getPlaylistSongsComplete, requestFailed);
    }

    function getPlaylistSongsComplete(data) {
      vm.songs = data;
    }

    function requestFailed(err) {
      console.log('err', err);
    }


  }
})();
