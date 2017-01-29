(function () {
  'use strict';

  angular.module('app.services')
    .service('userService', userService);

  userService.$inject = ['$http', '$q', '$rootScope', 'configService', 'Resource'];

  function userService($http, $q, $rootScope, configService, Resource) {

    var path = '/users';
    var service = new Resource(path);
    var appConfig = configService.getConfig();

    service.getCurrentUser = getCurrentUser;
    service.getUserPlaylists = getUserPlaylists;
    service.listCurrentUrl = listCurrentUrl;
    service.listPlaylistUrl = listPlaylistUrl;

   /**
    * URL Helper Method
    */
    function listCurrentUrl(resourcePath) {
      return appConfig.baseUrl + resourcePath + '/current';
    }

    function listPlaylistUrl(resourcePath, userId) {
      return appConfig.baseUrl + resourcePath + '/' + userId + '/playlists';
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

    function apiUserPlaylists(id) {
      return $http.get(listPlaylistUrl(service.path, id));
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
      $rootScope.calls.push(response);
      return response.data.data;
    }

    function getUserPlaylists(id) {
      return apiUserPlaylists(id)
        .then(userPlaylistComplete)
        .catch(requestFailed);
    }

    function userPlaylistComplete(response) {
      $rootScope.calls.push(response);
      return response.data.data;
    }

    function requestFailed(e) {
      return $q.reject(e);
    }

    return service;
  }
})();
