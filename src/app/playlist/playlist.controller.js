(function() {
  'use strict';

  angular
    .module('app')
    .controller('PlaylistController', PlaylistController);

    PlaylistController.$inject = [];

  /** @ngInject */
  function PlaylistController() {
    var vm = this;
    vm.playlists = null;

    activate();

    ////////////////////////////////////////////////////////////////////////////

    function activate() {
      // getPlaylists();
      vm.playlists =  [
        {
          "id": "1",
          "href": "/v1/playlists/1",
          "name": "Favorites"
        },
        {
          "id": "2",
          "href": "/v1/playlists/2",
          "name": "For Those About to Rock"
        },
        {
          "id": "3",
          "href": "/v1/playlists/3",
          "name": "Workout Mix"
        }
      ];

      vm.songs = [
        {
          "id": "10",
          "href": "/v1/songs/10",
          "title": "Spellbound",
          "duration": "4:30"
        },
        {
          "id": "14",
          "href": "/v1/songs/14",
          "title": "Bad Boy Boogie",
          "duration": "4:28"
        },
        {
          "id": "31",
          "href": "/v1/songs/31",
          "title": "Sinister Purpose",
          "duration": "3:23"
        },
        {
          "id": "39",
          "href": "/v1/songs/39",
          "title": "Up Around the Bend",
          "duration": "2:40"
        },
        {
          "id": "64",
          "href": "/v1/songs/64",
          "title": "Women",
          "duration": "5:42"
        },
        {
          "id": "68",
          "href": "/v1/songs/68",
          "title": "Pour Some Sugar on Me",
          "duration": "4:27"
        },
        {
          "id": "116",
          "href": "/v1/songs/116",
          "title": "You Were There",
          "duration": "5:31"
        }
      ];
    }


    // TODO: Uncomment once service is built
    // function getPlaylists() {
    //   return playlistService.all()
    //     .then(getPlaylistsComplete, requestFailed);
    // }
    //
    // function getPlaylistsComplete(data) {
    //   vm.playlists = data;
    // }
    //
    // function requestFailed(err) {
    //   console.log('err', err);
    // }


  }
})();
