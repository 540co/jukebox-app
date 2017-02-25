(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', 'userService'];

  /** @ngInject */
  function HomeController($rootScope, userService) {
    var vm = this;

    var currentUser  = null;
    vm.playlists     = null;

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
