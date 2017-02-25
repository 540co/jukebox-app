(function() {
  'use strict';

  angular
    .module('app')
    .controller('SongDetailController', SongDetailController);

    SongDetailController.$inject = ['$log', '$stateParams', 'songService', 'playlistService'];

  /** @ngInject */
  function SongDetailController($log, $stateParams, songService, playlistService) {
    var vm = this;
    var songId = $stateParams.songId;
    var fieldsQuery = '?fields=album,artist,duration,title';
    
    // scope variables
    vm.song = null;

    // scope functions
    vm.addPlaylistSongs = addPlaylistSongs;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      getSong(songId, fieldsQuery);
    }

    /**
     * Fetch song from servive
     */
    function getSong(id, query) {
      return songService.findById(songId, query)
        .then(getSongComplete, getSongFailed);
    }

    /**
     * Success callback for songService.findById
     */
    function getSongComplete(data) {
      vm.song = data.data.data;
    }

    /**
     * Error callback for songService.findById
     */
    function getSongFailed(err) {
      $log.log('Unable to fetch song', err);
    }

    /**
     * Add songs to a playlist
     */
    function addPlaylistSongs(id, data){
      console.log(data);
      var requestData = formatRequest(data);
      playlistService.addPlaylistSongs(id, requestData)
        .then(addSongComplete, addSongFailed);
    }

    /**
     * Success callback for playlistService.addPlaylistSongs
     */
    function addSongComplete(data) {
      $log.log('Added song to playlist');
    }

    /**
     * Error callback for playlistService.addPlaylistSongs
     */
    function addSongFailed(err) {
      $log.log('Unable to add song to playlist', err);
    }

    /**
     * Format request to add songs to playlist
     */
    function formatRequest(data) {
      var request = {};
      request.data = [{'id': data}];
      return request;
    }

  }
})();
