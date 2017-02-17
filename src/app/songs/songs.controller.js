(function() {
  'use strict';

  angular
    .module('app')
    .controller('SongController', SongController);

    SongController.$inject = ['$log', 'pagerService', 'playlistService', 'songService', '$http'];

  /** @ngInject */
  function SongController($log, pagerService, playlistService, songService, $http) {
    var vm = this;

    var linkHeader = null;
    var totalCount = null;

    vm.addPlaylistSongs = addPlaylistSongs;
    vm.onChange = onChange;
    vm.songs = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      vm.currentPage = 1;
      getSongs();
    }

    function getSongs(override) {
      return songService.all(override)
        .then(getSongsComplete, requestFailed);
    }

    function getSongsComplete(data) {
      // set total count and link header
      totalCount = data.data.meta.pagination.totalCount;
      linkHeader = data.headers('Link');

      vm.pager = pagerService.getPager(totalCount, linkHeader);
      vm.songs = data.data.data;
    }

    function onChange(path, page) {
      getSongs(path);
      vm.currentPage = page;
    }

    function requestFailed(err) {
      console.log('err', err);
    }

    function addPlaylistSongs(id, data){
      var requestData = formatRequest(data);
      playlistService.addPlaylistSongs(id, requestData)
        .then(addSongComplete, requestFailed);
    }

    function addSongComplete(data) {
      $log.log('Added song to playlist');
    }

    function formatRequest(data) {
      var request = {};
      request.data = [{'id': data}];
      return request;
    }

  }
})();
