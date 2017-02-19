(function() {
  'use strict';

  angular
    .module('app')
    .controller('AlbumController', AlbumController);

    AlbumController.$inject = ['albumService', 'pagerService'];

  /** @ngInject */
  function AlbumController(albumService, pagerService) {
    var vm = this;
    var linkHeader = null;
    var totalCount = null;

    vm.albums = null;
    vm.onChange = onChange;
    vm.sortAlbums = sortAlbums;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getAlbums();
      vm.currentPage = 1;
    }

    function getAlbums(override, query) {
      return albumService.all(override, query)
        .then(getAlbumsComplete, getAlbumsFailed);
    }

    function getAlbumsComplete(data) {
      totalCount = data.data.meta.pagination.totalCount;
      linkHeader = data.headers('Link');

      vm.pager = pagerService.getPager(totalCount, linkHeader);
      vm.albums = data.data.data;
    }

    function getAlbumsFailed(err) {
      console.log('err', err);
    }

    function onChange(path, page) {
      getAlbums(path);
      vm.currentPage = page;
    }

    function sortAlbums(value) {
      var query = '?sort=' + value;
      getAlbums(null, query);

      vm.currentPage = 1;
    }
  }
})();
