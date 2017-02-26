(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'authService', 'toastr'];

  /** @ngInject */
  function LoginController($state, authService, toastr) {
    var vm = this;

    // scope variables
    vm.loginError = null;
    vm.password = null;
    vm.username = null;

    // scope functions
    vm.login = login;

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Login auth service with username and password
     */
    function login(username, password) {
      authService.login(vm.username, vm.password)
        .then(loginComplete, loginFailed);
    }

    /**
     * Success callback for authService.login
     */
    function loginComplete(data) {
      authService.setCredentials(vm.username, vm.password, data);
      $state.go('home');
      toastr.info('Welcome back, ' + vm.username + '!', 'Logged In');
    }

    /**
     * Error callback for authService.login
     */
    function loginFailed(e) {
      // console.log(e);
      vm.loginError = 'There was an issue logging in. Please check your username and password and try again.';
      toastr.error(e.data.error, 'Oops!');
    }

  }
})();
