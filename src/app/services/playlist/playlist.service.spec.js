(function () {
  'use strict';

  describe('Playlist Service', function() {
    var playlistService = null;
    var $httpBackend = null;
    var instanceJSON = {"data": {}};

    beforeEach(function() {
      module('app.services');
      inject(function(_playlistService_, _$httpBackend_) {
        playlistService = _playlistService_;
        $httpBackend = _$httpBackend_;
      });
    });

    it('sets up the resource', function() {
      expect(playlistService.path).toEqual('/playlists');
    });

    it('calls resource list song url from getPlaylistSongs', function(){
      var resourceInstance = null;
      $httpBackend.when('GET', playlistService.listSongUrl(playlistService.path, '1')).respond(200, instanceJSON);
      $httpBackend.expectGET(playlistService.listSongUrl(playlistService.path, '1'));
      playlistService.getPlaylistSongs('1').then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance).toEqual(instanceJSON.data);
    });

    it('fails to call resource list song url from getPlaylistSongs', function(){
      var errorResponse = null;
      $httpBackend.when('GET', playlistService.listSongUrl(playlistService.path, '1')).respond(400);
      $httpBackend.expectGET(playlistService.listSongUrl(playlistService.path, '1'));
      playlistService.getPlaylistSongs('1').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });
  });
})();
