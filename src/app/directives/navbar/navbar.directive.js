(function() {
  'use strict';

  /**
   * @desc navbar directive that can be used anywhere across the app
   * @example <jukebox-navbar></jukebox-navbar>
   */
  angular
    .module('jukeboxApp')
    .directive('jukeboxNavbar', jukeboxNavbar);

  function jukeboxNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/navbar/navbar.html',
      controller: 'NavbarController',
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
