(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistDetailController', MyPlaylistDetailController);

    MyPlaylistDetailController.$inject = ['$log', '$stateParams', 'playlistService'];

  /** @ngInject */
  function MyPlaylistDetailController($log, $stateParams, playlistService) {
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

    function requestFailed(err) {
      $log.error('err', err);
    }

    function destroyPlaylistSongs(id, data){
      var requestData = formatRequest(data);
      playlistService.removePlaylistSongs(id, requestData)
        .then(success, requestFailed);
    }

    function addPlaylistSongs(id, data){
      console.log(data);
      var requestData = formatRequest(data);
      playlistService.addPlaylistSongs(id, requestData)
        .then(success, requestFailed);
    }

    function success(data) {
      $log.log('Added song to playlist');
    }

    function formatRequest(data) {
      var request = {};
      request.data = [{'id': data}];
      return request;
    }

  }
})();
