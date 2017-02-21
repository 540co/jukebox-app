(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistDetailController', MyPlaylistDetailController);

    MyPlaylistDetailController.$inject = ['$log', '$state', '$stateParams', 'playlistService'];

  /** @ngInject */
  function MyPlaylistDetailController($log, $state, $stateParams, playlistService) {
    var vm = this;
    vm.playlist = null;
    vm.songs = null;

    vm.addPlaylistSongs = addPlaylistSongs;
    vm.destroyPlaylistSongs = destroyPlaylistSongs;

    // vm.editPlaylist = editPlaylist;
    vm.destroyPlaylist = destroyPlaylist;

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
      vm.playlist = data.data.data;
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

    function destroyPlaylist(){
      playlistService.destroy(playlistId)
        .then(destroyPlaylistComplete, requestFailed);
    }

    function destroyPlaylistComplete(data) {
      $log.log('Playlist removed!');
      $state.go('myPlaylists', {}, {reload:true});
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
