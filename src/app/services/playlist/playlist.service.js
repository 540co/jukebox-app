(function () {
  'use strict';

  angular.module('app.services')
    .service('playlistService', playlistService);

  playlistService.$inject = ['$http', '$q', 'configService', 'Resource', '$rootScope'];

  function playlistService($http, $q, configService, Resource, $rootScope) {

    var path = '/playlists';
    var service = new Resource(path);
    var appConfig = configService.getConfig();

    service.addPlaylistSongs     = addPlaylistSongs;
    service.getPlaylistSongs     = getPlaylistSongs;
    service.removePlaylistSongs  = removePlaylistSongs;

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

    function apiCreatePlaylistSongs(id, data) {
      return $http.post(listSongUrl(path, id), data);
    }

    function apiDestroyPlaylistSongs(id, config) {
      return $http.delete(listSongUrl(path, id), config);
    }

   /**
    * Service Methods
    */
    function getPlaylistSongs(playlistId) {
      return apiPlaylistSongs(playlistId)
        .then(requestComplete)
        .catch(requestFailed);
    }

    function addPlaylistSongs(playlistId, data) {
      console.log('service', data);
      // // NOTE: must set content-type, angular defaults to
      // // content-type: text/plain;charset=UTF-8 for whatever wierd reason
      // var config = {
      //   "data": requestData,
      //    "headers":  {'content-type':'application/json'}
      // };

      return apiCreatePlaylistSongs(playlistId, data)
        .then(createPlaylistSongsComplete)
        .catch(requestFailed);
    }

    function removePlaylistSongs(playlistId, requestData) {
      // NOTE: must set content-type, angular defaults to
      // content-type: text/plain;charset=UTF-8 for whatever wierd reason
      var config = {
        "data": requestData,
         "headers":  {'content-type':'application/json'}
      };

      return apiDestroyPlaylistSongs(playlistId, config)
        .then(destroyPlaylistSongsComplete)
        .catch(requestFailed);
    }


    function requestComplete(response) {
      $rootScope.calls.push(response);
      return response.data.data;
    }

    function destroyPlaylistSongsComplete(response) {
      $rootScope.calls.push(response);
      return response.data.data;
    }

    function createPlaylistSongsComplete(response) {
      console.log('response', response);
      $rootScope.calls.push(response);
      return response.data.data;
    }

    function requestFailed(e) {
      return $q.reject(e);
    }

    return service;
  }
})();
