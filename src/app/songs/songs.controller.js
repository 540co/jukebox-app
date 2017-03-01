(function() {
  'use strict';

  angular
    .module('app.songs')
    .controller('SongController', SongController);

    SongController.$inject = ['toastr', 'pagerService', 'playlistService', 'songService'];

  /** @ngInject */
  function SongController(toastr, pagerService, playlistService, songService) {
    var vm = this;
    var linkHeader = null;
    var totalCount = null;

    // scope variables
    vm.songs = [];

    // scope functions
    vm.addPlaylistSongs = addPlaylistSongs;
    vm.filterSearch = filterSearch;
    vm.onChange = onChange;
    vm.sortSongs = sortSongs;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      vm.currentPage = 1;
      getSongs();
    }

    /**
     * Fetch songs from service
     */
    function getSongs(override, query) {
      return songService.all(override, query)
        .then(getSongsComplete, getSongsFailed);
    }

    /**
     * Success callback for songService.all
     */
    function getSongsComplete(data) {
      // set total count and link header
      totalCount = data.data.meta.pagination.totalCount;
      linkHeader = data.headers('Link');

      vm.pager = pagerService.getPager(totalCount, linkHeader);
      vm.songs = data.data.data;
    }

    /**
     * Error callback for songService.all
     */
    function getSongsFailed(err) {
      console.log('Unable to fetch songs', err);
    }

    /**
     * Pagination helper function
     */
    function onChange(path, page) {
      getSongs(path);
      vm.currentPage = page;
    }

    /**
     * Fetch all songs for a playlist
     */
    function addPlaylistSongs(id, data){
      var requestData = formatRequest(data);
      playlistService.addPlaylistSongs(id, requestData)
        .then(addSongComplete, addSongFailed);
    }

    /**
     * Success callback for playlistService.addPlaylistSongs
     */
    function addSongComplete(data) {
      toastr.success('Song added to playlist.', 'Success!');
    }

    /**
     * Error callback for playlistService.addPlaylistSongs
     */
    function addSongFailed(err) {
      toastr.error('Unable to add song to playlist', 'Oops!');
    }

    /**
     * Format request body to add songs to playlist
     */
    function formatRequest(data) {
      var request = {};
      request.data = [{'id': data}];
      return request;
    }

    /**
     * Sort songs
     */
    function sortSongs(value) {
      var query = '?sort=' + value;
      getSongs(null, query);

      vm.currentPage = 1;
    }

    /**
     * Filter songs
     */
    function filterSearch(value) {
      var filter = '==';
      var filterProperty = 'title';
      var query = '?filters=' + filterProperty + filter + value;

      getSongs(null, query);
      vm.currentPage = 1;
    }

  }
})();
