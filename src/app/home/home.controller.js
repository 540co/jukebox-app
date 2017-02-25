(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', 'userService'];

  /** @ngInject */
  function HomeController($rootScope, userService) {
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
     * Fetch current user's playlists
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
      console.error('Unable to retrieve playlists.', err);
    }

  }
})();
