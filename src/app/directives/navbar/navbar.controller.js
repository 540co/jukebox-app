(function() {
  'use strict';

  angular
    .module('app.directives')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$state', 'authService'];

  function NavbarController($state, authService) {
    var vm = this;

    // scope variables
    vm.logout = logout;

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Logs current user out
     */
    function logout() {
      authService.clearCredentials();
      $state.go('login');
    }
  }

})();
