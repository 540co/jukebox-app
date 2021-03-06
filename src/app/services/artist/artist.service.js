(function () {
  'use strict';

  angular.module('app.services')
    .service('artistService', artistService);

  artistService.$inject = ['$http', '$q', '$rootScope', 'configService', 'Resource'];

  function artistService($http, $q, $rootScope, configService, Resource) {

    var path = '/artists';
    var service = new Resource(path);
    var appConfig = configService.getConfig();

    service.getArtistAlbums  = getArtistAlbums;
    service.listAlbumUrl     = listAlbumUrl;

   /**
    * URL Helper Method
    */
    function listAlbumUrl(resourcePath, id) {
      return appConfig.baseUrl + resourcePath + '/' + id + '/albums';
    }

   /**
    * API Methods
    */
    function apiArtistAlbums(artistId) {
      // Set Authorization header based on token
      return $http.get(listAlbumUrl(service.path, artistId));
    }

   /**
    * Service Methods
    */
    function getArtistAlbums(artistId) {
      return apiArtistAlbums(artistId)
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
