(function() {
  'use strict';

  angular
    .module('app.artist')
    .controller('ArtistDetailController', ArtistDetailController);

    ArtistDetailController.$inject = ['$stateParams', 'artistService'];

  /** @ngInject */
  function ArtistDetailController($stateParams, artistService) {
    var vm = this;
    var artistId = $stateParams.artistId;
    var fieldsQuery = '?fields=albums,name';

    // scope variables
    vm.artist = null;
    vm.albums = [];

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getArtist(artistId, fieldsQuery);
      getArtistAlbums(artistId);
    }

    /**
     * Fetch artist by Id
     */
    function getArtist(id, query) {
      return artistService.findById(artistId, query)
        .then(getArtistComplete, getArtistFailed);
    }

    /**
     * Success callback for artistService.findById
     */
    function getArtistComplete(data) {
      vm.artist = data.data.data;
    }

    /**
     * Error callback for artistService.findById
     */
    function getArtistFailed(err) {
      console.log('Unable to fetch artist', err);
    }

    /**
     * Fetch all artist's albums
     */
    function getArtistAlbums(id) {
      return artistService.getArtistAlbums(artistId)
        .then(getArtistAlbumsComplete, getArtistAlbumsFailed);
    }

    /**
     * Success callback for artistService.getArtistAlbums
     */
    function getArtistAlbumsComplete(data) {
      vm.albums = data;
    }

    /**
     * Error callback for artistService.getArtistAlbums
     */
    function getArtistAlbumsFailed(err) {
      console.log('Unable to fetch albums for artist', err);
    }

  }
})();
