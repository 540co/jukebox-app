(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistCreateController', MyPlaylistCreateController);

    MyPlaylistCreateController.$inject = ['$log', '$rootScope','$state', 'playlistService'];

  /** @ngInject */
  function MyPlaylistCreateController($log, $rootScope, $state, playlistService) {
    var vm = this;
    vm.cancel = cancel;
    vm.submit = submit;

    var currentUser = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      currentUser = $rootScope.globals.currentUser;
    }

    /**
     * Create new playlist from service
     */
    function createPlaylist(data){
      playlistService.create(data)
        .then(createPlaylistComplete, requestFailed);
    }

    /**
     * Success callback for playlistService.create
     */
    function createPlaylistComplete(data) {
      $log.log('Playlist created!');
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
      createPlaylist(requestData);
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
