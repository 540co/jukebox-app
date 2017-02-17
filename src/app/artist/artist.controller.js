(function() {
  'use strict';

  angular
    .module('app')
    .controller('ArtistController', ArtistController);

    ArtistController.$inject = ['artistService', 'pagerService'];

  /** @ngInject */
  function ArtistController(artistService, pagerService) {
    var vm = this;

    var linkHeader = null;
    var totalCount = null;

    vm.artists = null;
    vm.onChange = onChange;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      vm.currentPage = 1;
      getArtists();
    }

    function getArtists(override) {
      return artistService.all(override)
        .then(getArtistsComplete, getArtistsFailed);
    }

    function getArtistsComplete(data) {
      // set total count and link header
      totalCount = data.data.meta.pagination.totalCount;
      linkHeader = data.headers('Link');

      vm.pager = pagerService.getPager(totalCount, linkHeader);
      vm.artists = data.data.data;
    }

    function getArtistsFailed(err) {
      console.log('err', err);
    }

    function onChange(path, page) {
      getArtists(path);
      vm.currentPage = page;
    }


  }
})();
