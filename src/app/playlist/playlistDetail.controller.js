(function() {
  'use strict';

  angular
    .module('app')
    .controller('PlaylistDetailController', PlaylistDetailController);

    PlaylistDetailController.$inject = ['$log', '$stateParams', 'playlistService'];

  /** @ngInject */
  function PlaylistDetailController($log, $stateParams, playlistService) {
    var vm = this;
    vm.playlist = null;
    vm.songs = null;

    vm.addPlaylistSongs = addPlaylistSongs;
    vm.destroyPlaylistSongs = destroyPlaylistSongs;

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

    function destroyPlaylistSongs(id, data){
      var requestData = formatRequest(data);
      playlistService.removePlaylistSongs(id, requestData)
        .then(removeSongComplete, requestFailed);
    }

    function removeSongComplete(data) {
      $log.log('Deleted song from playlist');
    }

    function addPlaylistSongs(id, data){
      console.log(data);
      var requestData = formatRequest(data);
      playlistService.addPlaylistSongs(id, requestData)
        .then(addSongComplete, requestFailed);
    }

    function addSongComplete(data) {
      $log.log('Added song to playlist');
    }

    function requestFailed(err) {
      $log.error('err', err);
    }

    function formatRequest(data) {
      var request = {};
      request.data = [{'id': data}];
      return request;
    }

  }
})();
