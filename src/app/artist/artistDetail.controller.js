(function() {
  'use strict';

  angular
    .module('app')
    .controller('ArtistDetailController', ArtistDetailController);

    ArtistDetailController.$inject = ['$stateParams', 'artistService'];

  /** @ngInject */
  function ArtistDetailController($stateParams, artistService) {
    var vm = this;
    vm.artist = null;
    vm.albums = null;

    var artistId = $stateParams.artistId;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getArtist();
      getArtistAlbums(artistId);
    }

    function getArtist() {
      return artistService.findById(artistId)
        .then(getArtistComplete, getArtistFailed);
    }

    function getArtistComplete(data) {
      vm.artist = data.data.data;
    }

    function getArtistFailed(err) {
      console.log('err', err);
    }

    function getArtistAlbums(id) {
      return artistService.getArtistAlbums(artistId)
        .then(getArtistAlbumsComplete, getArtistAlbumsFailed);
    }

    function getArtistAlbumsComplete(data) {
      vm.albums = data;
    }

    function getArtistAlbumsFailed(err) {
      console.log('err', err);
    }

  }
})();
