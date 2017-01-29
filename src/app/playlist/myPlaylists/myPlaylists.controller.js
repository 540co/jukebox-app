(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyPlaylistController', MyPlaylistController);

    MyPlaylistController.$inject = ['$rootScope', 'userService'];

  /** @ngInject */
  function MyPlaylistController($rootScope, userService) {
    var vm = this;
    vm.playlists = null;
    
    var currentUser = $rootScope.globals.currentUser.id;
    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
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
