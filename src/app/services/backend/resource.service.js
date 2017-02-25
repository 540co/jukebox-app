(function() {
  'use strict';

  angular
    .module('app.services')
    .service('Resource', Resource);

  Resource.$inject = ['$http', '$q', 'configService', '$rootScope'];

  function Resource($http, $q, configService, $rootScope) {
    var appConfig = configService.getConfig();
    $rootScope.calls = [];
    $rootScope.requests = [];

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

      function apiList(override, query) {
        if(override){
          return $http.get(override);
        }
        else if (query) {
          return $http.get(listUrl(path) + query);
        }
        else {
          return $http.get(listUrl(path));
        }
      }

      function apiInstanceById(id, query) {
        if(query) {
          return $http.get(instanceUrl(path, id) + query);
        }
        else {
          return $http.get(instanceUrl(path, id));
        }
      }

      function apiCreate(data) {
        return $http.post(listUrl(path), data);
      }

      function apiUpdate(id, data) {
        return $http.patch(instanceUrl(path, id), data);
      }

      function apiDestroy(id) {
        return $http.delete(instanceUrl(path, id));
      }

      /*
       *************************************************************************
       * Service Methods
       *************************************************************************
       */

      function all(override, query) {
        return apiList(override, query)
          .then(requestComplete)
          .catch(requestFailed);
      }

      function findById(id, query) {
        return apiInstanceById(id, query)
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

      function destroy(id, path) {
        return apiDestroy(id)
          .then(requestComplete)
          .catch(requestFailed);
      }

      function requestComplete(response) {
        $rootScope.calls.push(response);
        return response;
      }

      function requestFailed(e) {
        $rootScope.calls.push(e);
        return $q.reject(e);
      }
    }

    return Resource;

  }
})();
