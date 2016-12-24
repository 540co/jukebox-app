(function() {
  'use strict';

  angular
    .module('jukeboxApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1482593145201;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('View Jukebox on <a href="https://github.com/540co/jukebox-app" target="_blank"><b>GitHub</b></a>');
      vm.classAnimation = '';
    }
  }
})();
