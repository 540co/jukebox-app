(function() {
  'use strict';

  angular
    .module('app.playlist')
    .controller('MyPlaylistController', MyPlaylistController);

    MyPlaylistController.$inject = ['$rootScope', 'userService'];

  /** @ngInject */
  function MyPlaylistController($rootScope, userService) {
    var vm = this;
    var currentUser = null;

    // scope variables
    vm.playlists = [];

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
      console.log('Unable to fetch playlists.', err);
    }


  }
})();
