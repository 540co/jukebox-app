(function () {
  'use strict';

  angular.module('app.services')
    .service('songService', songService);

  songService.$inject = ['Resource'];

  function songService(Resource) {

    var path = '/songs';
    var service = new Resource(path);

    return service;
  }
})();
