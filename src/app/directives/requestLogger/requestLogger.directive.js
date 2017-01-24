(function() {
  'use strict';

  /**
   * @desc requestLogger directive that can be used anywhere across the app
   * @example <jukebox-request-logger></jukebox-request-logger>
   */
  angular
    .module('app.directives')
    .directive('jukeboxRequestLogger', jukeboxRequestLogger);

  function jukeboxRequestLogger() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/requestLogger/requestLogger.html',
      controller: 'RequestLoggerController',
      controllerAs: 'vm',
      bindToController: true,
      scope: true
    };

    return directive;
  }

})();
