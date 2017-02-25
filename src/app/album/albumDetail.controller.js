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

    function getAlbum(id, query) {
      return albumService.findById(albumId, query)
        .then(getAlbumComplete, requestFailed);
    }

    function getAlbumComplete(data) {
      vm.album = data.data.data;
    }

    function getAlbumSongs(id) {
      return albumService.getAlbumSongs(id)
        .then(getAlbumSongsComplete, requestFailed);
    }

    function getAlbumSongsComplete(data) {
      vm.songs = data;
    }

    function requestFailed(err) {
      console.log('err', err);
    }

  }
})();
