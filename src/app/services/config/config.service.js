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

    /**
     * Return config data set by global scope var
     * NOTE: configData is retrieved from global scope (app.config.js)
     */
    function getConfig() {
      return configData;
    }

  }
})();
