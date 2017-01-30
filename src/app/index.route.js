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
        }
      })
      .state('albums', {
        url: '/albums',
        templateUrl: 'app/album/album.html',
        controller: 'AlbumController',
        controllerAs: 'vm'
      })
      .state('albumDetail', {
        url: '/albums/:albumId',
        templateUrl: 'app/album/albumDetail.html',
        controller: 'AlbumDetailController',
        controllerAs: 'vm',
        params: {
          albumId: null
        },
      })
      .state('songs', {
        url: '/songs',
        templateUrl: 'app/songs/songs.html',
        controller: 'SongController',
        controllerAs: 'vm'
      })
      .state('songDetail', {
        url: '/songs/:songId',
        templateUrl: 'app/songs/songDetail.html',
        controller: 'SongDetailController',
        controllerAs: 'vm',
        params: {
          songId: null
        },
      })
      .state('playlists', {
        url: '/playlists',
        templateUrl: 'app/playlist/playlist.html',
        controller: 'PlaylistController',
        controllerAs: 'vm'
      })
      .state('playlistDetail', {
        url: '/playlists/:playlistId',
        templateUrl: 'app/playlist/playlistDetail.html',
        controller: 'PlaylistDetailController',
        controllerAs: 'vm',
        params: {
          playlistId: null
        },
      })
      .state('myPlaylists', {
        url: '/myplaylists',
        templateUrl: 'app/playlist/myPlaylists/myPlaylists.html',
        controller: 'MyPlaylistController',
        controllerAs: 'vm'
      })
      .state('myPlaylists.detail', {
        url: '/:playlistId',
        templateUrl: 'app/playlist/myPlaylists/myPlaylistDetail.html',
        controller: 'MyPlaylistDetailController',
        controllerAs: 'vm',
        params: {
          playlistId: null
        },
        parent: 'myPlaylists'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
