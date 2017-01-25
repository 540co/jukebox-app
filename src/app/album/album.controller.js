(function() {
  'use strict';

  angular
    .module('app')
    .controller('AlbumController', AlbumController);

    AlbumController.$inject = ['albumService'];

  /** @ngInject */
  function AlbumController(albumService) {
    var vm = this;
    vm.albums = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getAlbums();
    }

    function getAlbums() {
      return albumService.all()
        .then(getAlbumsComplete, getAlbumsFailed);
    }

    function getAlbumsComplete(data) {
      vm.albums = data;
    }

    function getAlbumsFailed(err) {
      console.log('err', err);
    }


  }
})();
