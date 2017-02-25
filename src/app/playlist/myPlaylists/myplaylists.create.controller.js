(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistCreateController', MyPlaylistCreateController);

    MyPlaylistCreateController.$inject = ['$log', '$rootScope','$state', 'toastr', 'playlistService'];

  /** @ngInject */
  function MyPlaylistCreateController($log, $rootScope, $state, toastr, playlistService) {
    var vm = this;
    var currentUser = null;

    // scope functions
    vm.cancel = cancel;
    vm.submit = submit;

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
      $state.go('myPlaylists.detail', {playlistId: data.data.data.id}, {reload:true});
      toastr.success('Playlist created!', 'Success');
      $log.log('Playlist created!');
    }

    /**
     * Failed callback for playlistService.create
     */
    function requestFailed(err) {
      toastr.error('There was an issue creating the playlist.', 'Oops!');
      $log.error('Unable to create playlist.', err);
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
