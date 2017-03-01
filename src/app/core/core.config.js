(function() {
  'use strict';

  angular
    .module('app.core')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // toastr config
    angular.extend(toastrConfig, {
      closeButton: true,
      closeHtml: '<button>&times;</button>',
      extendedTimeOut: 2000,
      timeOut: 2000,
      progressBar: false,
      tapToDismiss: true,
    });
  }

})();
