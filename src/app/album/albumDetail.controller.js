(function() {
  'use strict';

  angular
    .module('app')
    .controller('AlbumDetailController', AlbumDetailController);

    AlbumDetailController.$inject = ['$stateParams', 'albumService'];

  /** @ngInject */
  function AlbumDetailController($stateParams, albumService) {
    var vm = this;
    vm.album = null;
    vm.songs = null;

    var albumId = $stateParams.albumId;
    var fieldsQuery = '?fields=artist,coverArt,releasedOn,songs,title';

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

  }
})();
