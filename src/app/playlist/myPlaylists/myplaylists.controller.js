(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistController', MyPlaylistController);

    MyPlaylistController.$inject = ['$log', '$rootScope', 'userService'];

  /** @ngInject */
  function MyPlaylistController($log, $rootScope, userService) {
    var vm = this;
    var currentUser = null;

    // scope variables
    vm.playlists = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      currentUser = $rootScope.globals.currentUser.id;
      getPlaylists(currentUser);
    }

    /**
     * Fetch current user playlists from service
     */
    function getPlaylists(id) {
      return userService.getUserPlaylists(id)
        .then(getPlaylistsComplete, requestFailed);
    }

    /**
     * Success callback for userService.getUserPlaylists
     */
    function getPlaylistsComplete(data) {
      vm.playlists = data;
    }

    /**
     * Error callback for userService.getUserPlaylists
     */
    function requestFailed(err) {
      $log.error('Unable to fetch playlists.', err);
    }


  }
})();
