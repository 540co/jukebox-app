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

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getAlbum();
      getAlbumSongs(albumId);
    }

    function getAlbum() {
      return albumService.findById(albumId)
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
