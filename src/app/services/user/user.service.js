(function () {
  'use strict';

  angular.module('app.services')
    .service('userService', userService);

  userService.$inject = ['Resource'];

  function userService(Resource) {

    var path = '/users';
    var service = new Resource(path);

    return service;
  }
})();
