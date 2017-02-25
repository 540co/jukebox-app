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
    var fieldsQuery = '?fields=albums,name';

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getArtist(artistId, fieldsQuery);
      getArtistAlbums(artistId);
    }

    function getArtist(id, query) {
      return artistService.findById(artistId, query)
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
