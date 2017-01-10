(function () {
  'use strict';

  angular.module('app.services')
    .service('albumService', albumService);

  albumService.$inject = ['Resource'];

  function albumService(Resource) {

    var path = '/albums';
    var service = new Resource(path);

    return service;
  }
})();
