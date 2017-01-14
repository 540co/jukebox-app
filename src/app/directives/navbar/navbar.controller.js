(function() {
  'use strict';

  angular
    .module('app.directives')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$state', 'authService'];

  function NavbarController($state, authService) {
    var vm = this;

    vm.logout = logout;

    ////////////////////////////////////////////////////////////////////////////

    function logout() {
      authService.clearCredentials();
      $state.go('login');
    }
  }

})();
