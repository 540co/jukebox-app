(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('authService', authService);

    authService.$inject = ['$cookies', '$http', '$rootScope', 'md5', 'userService'];

  function authService($cookies, $http, $rootScope, md5, userService) {

    var service = {
      login: login,
      clearCredentials: clearCredentials,
      setCredentials: setCredentials
    };

    return service;

    ////////////////////////////////////////////////////////////////////////////

    function login(username, password) {
      // create MD5 hash for oauth token
      var authToken = md5.createHash(username + ':' + password);
      // return a promise to resolve at login
      return userService.getCurrentUser(authToken);
    }

    function setCredentials(username, password, userData) {
      // create MD5 hash for oauth token
      var authToken = md5.createHash(username + ':' + password);

      // set global user data
      // NOTE: $rootScope is not best practice, but its easy to access data accross all controller scopes
      $rootScope.globals = {
          currentUser: {
              username: userData.username,
              firstName: userData.firstName,
              lastName: userData.lastName
          }
      };

      // set default auth header for http requests
      $http.defaults.headers.common.Authorization = 'Bearer ' + authToken;

      // store user details in globals cookie that keeps user logged in for 1 day (or until they logout)
      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 1);
      $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
    }

    function clearCredentials() {
       $rootScope.globals = {};
       $cookies.remove('globals');
       $http.defaults.headers.common.Authorization = 'Basic';
    }

  }
})();
