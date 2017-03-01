(function() {
  'use strict';

  angular
    .module('app.album')
    .controller('AlbumDetailController', AlbumDetailController);

    AlbumDetailController.$inject = ['$stateParams', 'toastr', 'albumService', 'playlistService'];

  /** @ngInject */
  function AlbumDetailController($stateParams, toastr, albumService, playlistService) {
    var vm = this;
    var albumId = $stateParams.albumId;
    var fieldsQuery = '?fields=artist,coverArt,releasedOn,songs,title';

    // scope functions
    vm.album = null;
    vm.songs = [];

    // scope functions
    vm.addPlaylistSongs = addPlaylistSongs;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getAlbum(albumId, fieldsQuery);
      getAlbumSongs(albumId);
    }

    /**
     * Fetch album by Id
     */
    function getAlbum(id, query) {
      return albumService.findById(albumId, query)
        .then(getAlbumComplete, getAlbumFailed);
    }

    /**
     * Success callback for albumService.findById
     */
    function getAlbumComplete(data) {
      vm.album = data.data.data;
    }

    /**
     * Error callback for albumService.findById
     */
    function getAlbumFailed(err) {
      console.log('Unable to fetch album', err);
    }

    /**
     * Fetch all songs for an album
     */
    function getAlbumSongs(id) {
      return albumService.getAlbumSongs(id)
        .then(getAlbumSongsComplete, getAlbumSongsFailed);
    }

    /**
     * Success callback for albumService.getAlbumSongs
     */
    function getAlbumSongsComplete(data) {
      vm.songs = data;
    }

    /**
     * Error callback for albumService.getAlbumSongs
     */
    function getAlbumSongsFailed(err) {
      console.log('Unable to fetch songs for album', err);
    }

    /**
     * Fetch all songs for a playlist
     */
    function addPlaylistSongs(id, data){
      var requestData = formatRequest(data);
      playlistService.addPlaylistSongs(id, requestData)
        .then(addSongComplete, addSongFailed);
    }

    /**
     * Success callback for playlistService.addPlaylistSongs
     */
    function addSongComplete(data) {
      toastr.success('Song added to playlist.', 'Success!');
    }

    /**
     * Error callback for playlistService.addPlaylistSongs
     */
    function addSongFailed(err) {
      toastr.error('Unable to add song to playlist.', 'Oops!');
    }

    /**
     * Format request body to add songs to playlist
     */
    function formatRequest(data) {
      var request = {};
      request.data = [{'id': data}];
      return request;
    }

  }
})();
