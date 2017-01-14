(function() {
  'use strict';

  angular
    .module('app.core')
    .run(runBlock);

    runBlock.$inject = ['$rootScope', '$location', '$cookies'];

  /** @ngInject */
  function runBlock($rootScope, $location, $cookies) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        var loggedIn = $rootScope.globals.currentUser;
        if (!loggedIn) {
            $location.path('/login');
        }
    });
  }

})();
