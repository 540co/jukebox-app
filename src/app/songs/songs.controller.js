(function() {
  'use strict';

  angular
    .module('app')
    .controller('SongController', SongController);

    SongController.$inject = ['$log', 'playlistService', 'songService'];

  /** @ngInject */
  function SongController($log, playlistService, songService) {
    var vm = this;
    vm.songs = null;
    vm.addPlaylistSongs = addPlaylistSongs;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getSongs();
    }

    function getSongs() {
      return songService.all()
        .then(getSongsComplete, requestFailed);
    }

    function getSongsComplete(data) {
      vm.songs = data;
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
