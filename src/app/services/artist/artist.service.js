(function () {
  'use strict';

  angular.module('app.services')
    .service('artistService', artistService);

  artistService.$inject = ['Resource'];

  function artistService(Resource) {

    var path = '/artists';
    var service = new Resource(path);

    return service;
  }
})();
