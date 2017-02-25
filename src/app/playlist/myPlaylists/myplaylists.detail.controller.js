(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistDetailController', MyPlaylistDetailController);

    MyPlaylistDetailController.$inject = ['$log', '$state', '$stateParams', 'toastr', 'playlistService'];

  /** @ngInject */
  function MyPlaylistDetailController($log, $state, $stateParams, toastr, playlistService) {
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

    /**
     * Fetch playlist from service
     */
    function getPlaylist(id) {
      return playlistService.findById(id)
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
     * Fetch playlist songs from service
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
      $log.error('Unable to fetch songs for playlist', err);
    }

    /**
     * Remove song from playlist
     */
    function destroyPlaylistSongs(id, data){
      var requestData = formatRequest(data);
      playlistService.removePlaylistSongs(id, requestData)
        .then(removeSongComplete, removeSongFailed);
    }

    /**
     * Success callback for playlistService.removePlaylistSongs
     */
    function removeSongComplete(data) {
      toastr.success('Removed song from playlist.', 'Success!');
      $log.log('Deleted song from playlist');
    }

    /**
     * Error callback for playlistService.removePlaylistSongs
     */
    function removeSongFailed(err) {
      toastr.error('Unable to remove song from playlist.', 'Oops!');
      $log.error('Failed to remove song from playlist', err);
    }

    /**
     * Add song to playlist
     */
    function addPlaylistSongs(id, data) {
      var requestData = formatRequest(data);
      playlistService.addPlaylistSongs(id, requestData)
        .then(addSongComplete, addSongFailed);
    }

    /**
     * Success callback for playlistService.addPlaylistSongs
     */
    function addSongComplete(data) {
      toastr.success('Song added to playlist!', 'Success');
      $log.log('Added song to playlist');
    }

    /**
     * Error callback for playlistService.addPlaylistSongs
     */
    function addSongFailed(err) {
      toastr.error('Unable to add song to playlist.', 'Oops!');
      $log.error('Failed to add song to playlist', err);
    }

    /**
     * Destroy playlist from service
     */
    function destroyPlaylist(){
      playlistService.destroy(playlistId)
        .then(destroyPlaylistComplete, destroyPlaylistFailed);
    }

    /**
     * Success callback for playlistService.destroy
     */
    function destroyPlaylistComplete(data) {
      $state.go('myPlaylists', {}, {reload:true});
      toastr.success('Playlist deleted!', 'Success');
      $log.log('Playlist removed!');
    }

    /**
     * Error callback for playlistService.destroy
     */
    function destroyPlaylistFailed(err) {
      toastr.error('Unable to delete playlist.', 'Oops!');
      $log.error('Unable to delete playlist', err);
    }

    /**
     * Format request for adding songs to playlist
     */
    function formatRequest(data) {
      var request = {};
      request.data = [{'id': data}];
      return request;
    }

  }
})();
