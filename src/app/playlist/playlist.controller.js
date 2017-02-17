(function() {
  'use strict';

  angular
    .module('app')
    .controller('PlaylistController', PlaylistController);

    PlaylistController.$inject = ['pagerService', 'playlistService'];

  /** @ngInject */
  function PlaylistController(pagerService, playlistService) {
    var vm = this;
    var linkHeader = null;
    var totalCount = null;

    vm.onChange = onChange;
    vm.playlists = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getPlaylists();
      vm.currentPage = 1;
    }

    function getPlaylists(override) {
      return playlistService.all(override)
        .then(getPlaylistsComplete, requestFailed);
    }

    function getPlaylistsComplete(data) {
      // set total count and link header
      totalCount = data.data.meta.pagination.totalCount;
      linkHeader = data.headers('Link');

      vm.pager = pagerService.getPager(totalCount, linkHeader);
      vm.playlists = data.data.data;
    }

    function requestFailed(err) {
      console.log('err', err);
    }

    function onChange(path, page) {
      getPlaylists(path);
      vm.currentPage = page;
    }


  }
})();
