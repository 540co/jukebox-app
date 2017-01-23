(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('artists', {
        url: '/artists',
        templateUrl: 'app/artist/artist.html',
        controller: 'ArtistController',
        controllerAs: 'vm'
      })
      .state('artistDetail', {
        url: '/artists/:artistId',
        templateUrl: 'app/artist/artistDetail.html',
        controller: 'ArtistDetailController',
        controllerAs: 'vm',
        params: {
          artistId: null
        },
      });

    $urlRouterProvider.otherwise('/');
  }

})();
