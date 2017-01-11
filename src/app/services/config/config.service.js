(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('configService', configService);

  function configService() {

    var service = {
      getConfig: getConfig
    };

    return service;

    ////////////////////////////////////////////////////////////////////////////

    //NOTE: configData is retrieved from global scope (app.config.js)
    function getConfig() {
      return configData;
    }

  }
})();
