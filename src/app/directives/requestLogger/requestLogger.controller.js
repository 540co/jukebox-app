(function() {
  'use strict';

  angular
    .module('app.directives')
    .controller('RequestLoggerController', RequestLoggerController);

  RequestLoggerController.$inject = ['$rootScope'];

  function RequestLoggerController($rootScope) {
    var vm = this;

    // scope variables
    vm.clearLog = clearLog;

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Clears request logger
     */
    function clearLog() {
      $rootScope.calls = [];
    }
  }

})();
