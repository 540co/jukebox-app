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

    vm.artists   = null;
    vm.onChange  = onChange;
    vm.sortArtist = sortArtist;
    vm.filterSearch = filterSearch;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      vm.currentPage = 1;
      getArtists();
    }

    function getArtists(override, query) {
      return artistService.all(override, query)
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

    function sortArtist(value) {
      var query = '?sort=' + value;
      getArtists(null, query);

      vm.currentPage = 1;
    }

    function filterSearch(value) {
      var filter = '==';
      var filterProperty = 'name';
      var query = '?filters=' + filterProperty + filter + value;

      getArtists(null, query);
      vm.currentPage = 1;
    }
  }
})();
