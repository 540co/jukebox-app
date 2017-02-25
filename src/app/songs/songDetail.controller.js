(function() {
  'use strict';

  angular
    .module('app')
    .controller('SongDetailController', SongDetailController);

    SongDetailController.$inject = ['$log', '$stateParams', 'songService', 'playlistService'];

  /** @ngInject */
  function SongDetailController($log, $stateParams, songService, playlistService) {
    var vm = this;
    vm.song = null;

    vm.addPlaylistSongs = addPlaylistSongs;

    var songId = $stateParams.songId;
    var fieldsQuery = '?fields=album,artist,duration,title';

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getSong(songId, fieldsQuery);
    }

    function getSong(id, query) {
      return songService.findById(songId, query)
        .then(getSongComplete, requestFailed);
    }

    function getSongComplete(data) {
      vm.song = data.data.data;
    }

    function requestFailed(err) {
      console.log('err', err);
    }

    function addPlaylistSongs(id, data){
      console.log(data);
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
