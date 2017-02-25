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

    var playlistId = $stateParams.playlistId;
    var fieldsQuery = '?fields=name,songs,user';

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getPlaylist(playlistId, fieldsQuery);
      getPlaylistSongs(playlistId);
    }

    function getPlaylist(id, query) {
      return playlistService.findById(id, query)
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
