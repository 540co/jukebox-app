(function() {
  'use strict';

  angular
    .module('app.playlist')
    .controller('PlaylistController', PlaylistController);

    PlaylistController.$inject = ['pagerService', 'playlistService'];

  /** @ngInject */
  function PlaylistController(pagerService, playlistService) {
    var vm = this;
    var linkHeader = null;
    var totalCount = null;

    // scope variables
    vm.playlists = [];

    // scope functions
    vm.filterSearch = filterSearch;
    vm.onChange = onChange;
    vm.sortPlaylist = sortPlaylist;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getPlaylists();
      vm.currentPage = 1;
    }

    /**
     * Fetch all playlists from service
     */
    function getPlaylists(override, query) {
      return playlistService.all(override, query)
        .then(getPlaylistsComplete, requestFailed);
    }

    /**
     * Success callback for playlistService.all
     */
    function getPlaylistsComplete(data) {
      // set total count and link header
      totalCount = data.data.meta.pagination.totalCount;
      linkHeader = data.headers('Link');

      vm.pager = pagerService.getPager(totalCount, linkHeader);
      vm.playlists = data.data.data;
    }

    /**
     * Error callback for playlistService.all
     */
    function requestFailed(err) {
      console.log('err', err);
    }

    /**
     * Watch method for pagination
     */
    function onChange(path, page) {
      getPlaylists(path);
      vm.currentPage = page;
    }

    /**
     * Sort playlists
     */
    function sortPlaylist(value) {
      var query = '?sort=' + value;
      getPlaylists(null, query);

      vm.currentPage = 1;
    }

    /**
     * Filter results for playlists
     */
    function filterSearch(value) {
      var filter = '==';
      var filterProperty = 'name';
      var query = '?filters=' + filterProperty + filter + value;

      getPlaylists(null, query);
      vm.currentPage = 1;
    }

  }
})();
