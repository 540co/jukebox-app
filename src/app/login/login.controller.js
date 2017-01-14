(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'authService'];

  /** @ngInject */
  function LoginController($state, authService) {
    var vm = this;

    // variables
    vm.loginError = null;
    vm.password = null;
    vm.username = null;

    // functions
    vm.login = login;

    ////////////////////////////////////////////////////////////////////////////

    function login(username, password) {
      authService.login(vm.username, vm.password)
        .then(loginComplete, loginFailed);
    }

    function loginComplete(data) {
      authService.setCredentials(vm.username, vm.password, data);
      $state.go('home');
    }

    function loginFailed(e) {
      vm.loginError = 'Login failed! Please login again.';
      console.error(vm.loginError, e);
    }

  }
})();
