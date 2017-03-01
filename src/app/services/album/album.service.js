(function () {
  'use strict';

  angular.module('app.services')
    .service('albumService', albumService);

  albumService.$inject = ['$http', '$q', '$rootScope', 'configService', 'Resource'];

  function albumService($http, $q, $rootScope, configService, Resource) {

    var path = '/albums';
    var service = new Resource(path);
    var appConfig = configService.getConfig();

    service.getAlbumSongs  = getAlbumSongs;
    service.listSongUrl    = listSongUrl;

   /**
    * URL Helper Method
    */
    function listSongUrl(resourcePath, id) {
      return appConfig.baseUrl + resourcePath + '/' + id + '/songs';
    }

   /**
    * API Methods
    */
    function apiAlbumSongs(albumId) {
      return $http.get(listSongUrl(service.path, albumId));
    }

   /**
    * Service Methods
    */
    function getAlbumSongs(albumId) {
      return apiAlbumSongs(albumId)
        .then(requestComplete)
        .catch(requestFailed);
    }

    function requestComplete(response) {
      $rootScope.calls.push(response);
      return response.data.data;
    }

    function requestFailed(e) {
      $rootScope.calls.push(e);
      return $q.reject(e);
    }

    return service;
  }
})();
