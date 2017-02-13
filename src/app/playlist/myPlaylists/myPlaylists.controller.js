(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistController', MyPlaylistController);

    MyPlaylistController.$inject = ['$rootScope', 'userService'];

  /** @ngInject */
  function MyPlaylistController($rootScope, userService) {
    var vm = this;
    var currentUser = null;
    vm.playlists = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      currentUser = $rootScope.globals.currentUser.id;
      getPlaylists(currentUser);
    }

    function getPlaylists(id) {
      return userService.getUserPlaylists(id)
        .then(getPlaylistsComplete, requestFailed);
    }

    function getPlaylistsComplete(data) {
      vm.playlists = data;
    }

    function requestFailed(err) {
      console.log('err', err);
    }


  }
})();
