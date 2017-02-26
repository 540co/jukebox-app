(function() {
  'use strict';

  angular
    .module('app.artist')
    .controller('ArtistController', ArtistController);

    ArtistController.$inject = ['artistService', 'pagerService'];

  /** @ngInject */
  function ArtistController(artistService, pagerService) {
    var vm = this;
    var linkHeader = null;
    var totalCount = null;

    // scope variables
    vm.artists = null;

    // scope functions
    vm.filterSearch = filterSearch;
    vm.onChange  = onChange;
    vm.sortArtist = sortArtist;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      vm.currentPage = 1;
      getArtists();
    }

    /**
     * Fetch all artists from servive
     */
    function getArtists(override, query) {
      return artistService.all(override, query)
        .then(getArtistsComplete, getArtistsFailed);
    }

    /**
     * Success callback for artistService.all
     */
    function getArtistsComplete(data) {
      // set total count and link header
      totalCount = data.data.meta.pagination.totalCount;
      linkHeader = data.headers('Link');

      vm.pager = pagerService.getPager(totalCount, linkHeader);
      vm.artists = data.data.data;
    }

    /**
     * Error callback for artistService.all
     */
    function getArtistsFailed(err) {
      console.log('err', err);
    }

    /**
     * Pagination helper function
     */
    function onChange(path, page) {
      getArtists(path);
      vm.currentPage = page;
    }

    /**
     * Sort artists
     */
    function sortArtist(value) {
      var query = '?sort=' + value;
      getArtists(null, query);

      vm.currentPage = 1;
    }

    /**
     * Filter artists
     */
    function filterSearch(value) {
      var filter = '==';
      var filterProperty = 'name';
      var query = '?filters=' + filterProperty + filter + value;

      getArtists(null, query);
      vm.currentPage = 1;
    }
  }
})();
