(function() {
  'use strict';

  angular
    .module('app.core')
    .run(runBlock);

    runBlock.$inject = ['$rootScope', '$location', '$cookies', '$http'];

  /** @ngInject */
  function runBlock($rootScope, $location, $cookies, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        var loggedIn = $rootScope.globals.currentUser;
        if (!loggedIn) {
            $http.defaults.headers.common.Authorization = 'Basic';
            $location.path('/login');
        } else {
          // set default auth header for http requests
          $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.globals.sessionId;
        }
    });
  }

})();
