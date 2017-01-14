(function() {
  'use strict';

  angular
    .module('app.services')
    .service('Resource', Resource);

  Resource.$inject = ['$http', '$q', 'configService'];

  function Resource($http, $q, configService) {
    var appConfig = configService.getConfig();
    
    function Resource(path) {
      this.path = path;
      this.api = {
        list: apiList,
        instanceById: apiInstanceById,
        create: apiCreate,
        update: apiUpdate,
        destroy: apiDestroy
      };

      this.listUrl      = listUrl;
      this.instanceUrl  = instanceUrl;
      this.all          = all;
      this.findById     = findById;
      this.create       = create;
      this.update       = update;
      this.destroy      = destroy;

      /*
       *************************************************************************
       * URL Helper Methods
       *************************************************************************
       */
      function listUrl(resourcePath) {
        return appConfig.baseUrl + resourcePath;
      }

      function instanceUrl(resourcePath, id) {
        return appConfig.baseUrl + resourcePath + '/' + id;
      }

      /*
       *************************************************************************
       * API Methods
       *************************************************************************
       */

      function apiList() {
        return $http.get(listUrl(path));
      }

      function apiInstanceById(id) {
        return $http.get(instanceUrl(path, id));
      }

      function apiCreate(data) {
        return $http.post(listUrl(path), data);
      }

      function apiUpdate(id, data) {
        return $http.put(instanceUrl(path, id), data);
      }

      function apiDestroy(id) {
        return $http.delete(instanceUrl(path, id));
      }

      /*
       *************************************************************************
       * Service Methods
       *************************************************************************
       */

      function all() {
        return apiList()
          .then(requestComplete)
          .catch(requestFailed);
      }

      function findById(id) {
        return apiInstanceById(id)
          .then(requestComplete)
          .catch(requestFailed);
      }

      function create(data) {
        return apiCreate(data)
          .then(requestComplete)
          .catch(requestFailed);
      }

      function update(id, data) {
        return apiUpdate(id, data)
          .then(requestComplete)
          .catch(requestFailed);
      }

      function destroy(id) {
        return apiDestroy(id)
          .then(requestComplete)
          .catch(requestFailed);
      }

      function requestComplete(response) {
        return response.data.data;
      }

      function requestFailed(e) {
        return $q.reject(e);
      }
    }

    return Resource;

  }
})();
