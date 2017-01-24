(function() {
  'use strict';

  angular
    .module('app')
    .controller('ArtistController', ArtistController);

    ArtistController.$inject = ['artistService'];

  /** @ngInject */
  function ArtistController(artistService) {
    var vm = this;
    vm.artists = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getArtists();
    }

    function getArtists() {
      return artistService.all()
        .then(getArtistsComplete, getArtistsFailed);
    }

    function getArtistsComplete(data) {
      vm.artists = data;
    }

    function getArtistsFailed(err) {
      console.log('err', err);
    }


  }
})();
