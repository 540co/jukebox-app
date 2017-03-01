(function() {
  'use strict';

  angular
    .module('app.album')
    .controller('AlbumController', AlbumController);

    AlbumController.$inject = ['albumService', 'pagerService'];

  /** @ngInject */
  function AlbumController(albumService, pagerService) {
    var vm = this;
    var linkHeader = null;
    var totalCount = null;

    // scope variables
    vm.albums = [];

    // scope functions
    vm.filterSearch = filterSearch;
    vm.onChange = onChange;
    vm.sortAlbums = sortAlbums;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getAlbums();
      vm.currentPage = 1;
    }

    /**
     * Fetch all albums from service
     */
    function getAlbums(override, query) {
      return albumService.all(override, query)
        .then(getAlbumsComplete, getAlbumsFailed);
    }

    /**
     * Success callback for albumService.all
     */
    function getAlbumsComplete(data) {
      totalCount = data.data.meta.pagination.totalCount;
      linkHeader = data.headers('Link');

      vm.pager = pagerService.getPager(totalCount, linkHeader);
      vm.albums = data.data.data;
    }

    /**
     * Error callback for albumService.all
     */
    function getAlbumsFailed(err) {
      console.log('err', err);
    }

    /**
     * Pagination help function
     */
    function onChange(path, page) {
      getAlbums(path);
      vm.currentPage = page;
    }

    /**
     * Sort albums
     */
    function sortAlbums(value) {
      var query = '?sort=' + value;
      getAlbums(null, query);

      vm.currentPage = 1;
    }

    /**
     * filter albums
     */
    function filterSearch(value) {
      var filter = '==';
      var filterProperty = 'title';
      var query = '?filters=' + filterProperty + filter + value;

      getAlbums(null, query);
      vm.currentPage = 1;
    }
  }
})();
