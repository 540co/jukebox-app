(function () {
  'use strict';

  angular.module('app.services')
    .service('playlistService', playlistService);

  playlistService.$inject = ['$http', '$q', 'configService', 'Resource', '$rootScope'];

  function playlistService($http, $q, configService, Resource, $rootScope) {

    var path = '/playlists';
    var service = new Resource(path);
    var appConfig = configService.getConfig();

    service.getPlaylistSongs = getPlaylistSongs;
    service.listSongUrl = listSongUrl;

   /**
    * URL Helper Method
    */
    function listSongUrl(resourcePath, id) {
      return appConfig.baseUrl + resourcePath + '/' + id + '/songs';
    }

   /**
    * API Methods
    */
    function apiPlaylistSongs(playlistId) {
      return $http.get(listSongUrl(service.path, playlistId));
    }

   /**
    * Service Methods
    */
    function getPlaylistSongs(playlistId) {
      return apiPlaylistSongs(playlistId)
        .then(requestComplete)
        .catch(requestFailed);
    }

    function requestComplete(response) {
      $rootScope.calls.push(response);
      return response.data.data;
    }

    function requestFailed(e) {
      return $q.reject(e);
    }

    return service;
  }
})();
