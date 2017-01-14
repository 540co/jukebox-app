(function () {
  'use strict';

  angular.module('app.services')
    .service('userService', userService);

  userService.$inject = ['$http', '$q', 'configService', 'Resource'];

  function userService($http, $q, configService, Resource) {

    var path = '/users';
    var service = new Resource(path);
    var appConfig = configService.getConfig();

    service.getCurrentUser = getCurrentUser;
    service.listCurrentUrl = listCurrentUrl;
   /**
    * URL Helper Method
    */
    function listCurrentUrl(resourcePath) {
      return appConfig.baseUrl + resourcePath + '/current';
    }

   /**
    * API Methods
    */
    function apiCurrentUser(token) {
      // Set Authorization header based on token
      return $http.get(listCurrentUrl(service.path), {
        headers: {'Authorization': 'Bearer ' + token}
      });
    }

   /**
    * Service Methods
    */
    function getCurrentUser(token) {
      return apiCurrentUser(token)
        .then(requestComplete)
        .catch(requestFailed);
    }

    function requestComplete(response) {
      return response.data.data;
    }

    function requestFailed(e) {
      return $q.reject(e);
    }

    return service;
  }
})();
