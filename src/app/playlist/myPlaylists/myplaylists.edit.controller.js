(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistEditController', MyPlaylistEditController);

    MyPlaylistEditController.$inject = ['$log', '$rootScope','$state', '$stateParams', 'playlistService'];

  /** @ngInject */
  function MyPlaylistEditController($log, $rootScope, $state, $stateParams, playlistService) {
    var vm = this;
    vm.cancel = cancel;
    vm.submit = submit;

    var currentUser = null;
    var playlistId = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      currentUser = $rootScope.globals.currentUser;
      playlistId = $stateParams.playlistId;
      fetchPlaylist(playlistId);
    }

    /**
     * Edit playlist from service
     */
    function fetchPlaylist(id){
      playlistService.findById(id)
        .then(fetchPlaylistComplete, requestFailed);
    }

    /**
     * Success callback for playlistService.findById
     */
    function fetchPlaylistComplete(data) {
      setPlaylistModel(data);
    }

    /**
     * Set playlist form model
     */
    function setPlaylistModel(playlistModel) {
      vm.playlist = {};
      vm.playlist.name = playlistModel.name;
    }

    /**
     * Edit playlist from service
     */
    function updatePlaylist(id, data){
      playlistService.update(id, data)
        .then(updatePlaylistComplete, requestFailed);
    }

    /**
     * Success callback for playlistService.update
     */
    function updatePlaylistComplete(data) {
      $log.log('Playlist updated!');
      $state.go('myPlaylists.detail', {playlistId: data.id}, {reload:true});
    }

    /**
     * Failed callback for playlistService.create
     */
    function requestFailed(err) {
      $log.error('err', err);
    }

    /**
     * Submit for playlist form
     */
    function submit() {
      // Deep copy form model
      var playlist = {};
      angular.copy(vm.playlist, playlist);

      // Format request
      var requestData = formatRequest(playlist);
      updatePlaylist(playlistId, requestData);
    }

    /**
     * Closes add calendar event page and returns to calendar events
     */
    function cancel() {
      $state.go('myPlaylists', {reload:true});
    }

    /**
     * Format request helper
     */
    function formatRequest(data) {
      var request = {};
      request.data = {
        'name': data
      };

      var user = {
        'user': {
          'id': currentUser.id
        }
      };

      // Deep (recursively) copy the properties of the source objects to the destination object
      // ref: http://davidcai.github.io/blog/posts/copy-vs-extend-vs-merge/
      angular.merge(request.data, data, user);

      return request;
    }

  }
})();
