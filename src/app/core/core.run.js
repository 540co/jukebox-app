(function() {
  'use strict';

  angular
    .module('jukeboxApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
