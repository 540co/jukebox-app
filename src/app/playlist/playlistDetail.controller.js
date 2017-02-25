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

    /**
     * Fetch playlistService by Id
     */
    function getPlaylist(id, query) {
      return playlistService.findById(id, query)
        .then(getPlaylistComplete, getPlaylistFailed);
    }

    /**
     * Success callback for playlistService.findById
     */
    function getPlaylistComplete(data) {
      vm.playlist = data.data.data;
    }

    /**
     * Error callback for playlistService.findById
     */
     function getPlaylistFailed(err) {
       $log.error('Unable to fetch playlist', err);
     }

   /**
    * Fetch all playlist songs
    */
    function getPlaylistSongs(id) {
      return playlistService.getPlaylistSongs(id)
        .then(getPlaylistSongsComplete, getPlaylistSongsFailed);
    }

    /**
     * Success callback for playlistService.getPlaylistSongs
     */
    function getPlaylistSongsComplete(data) {
      vm.songs = data;
    }

    /**
     * Error callback for playlistService.getPlaylistSongs
     */
    function getPlaylistSongsFailed(err) {
      $log.error('err', err);
    }

    /**
     * Add song to playlist
     */
    function addPlaylistSongs(id, data){
      console.log(data);
      var requestData = formatRequest(data);
      playlistService.addPlaylistSongs(id, requestData)
        .then(addSongComplete, addSongFailed);
    }

    /**
     * Success callback for playlistService.addPlaylistSongs
     */
    function addSongComplete(data) {
      $log.log('Added song to playlist');
    }

    /**
     * Error callback for playlistService.addPlaylistSongs
     */
    function addSongFailed(err) {
      $log.error('err', err);
    }

    /**
     * Format request for adding songs to a playlist
     */
    function formatRequest(data) {
      var request = {};
      request.data = [{'id': data}];
      return request;
    }

  }
})();
