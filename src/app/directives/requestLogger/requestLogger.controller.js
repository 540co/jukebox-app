(function() {
  'use strict';

  angular
    .module('app.directives')
    .controller('RequestLoggerController', RequestLoggerController);

  RequestLoggerController.$inject = ['$rootScope'];

  function RequestLoggerController($rootScope) {
    var vm = this;
    vm.clearLog = clearLog;

    ////////////////////////////////////////////////////////////////////////////

    function clearLog() {
      $rootScope.calls = [];
    }
  }

})();
