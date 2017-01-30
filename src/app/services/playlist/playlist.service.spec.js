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

    it('calls resource list song url from addPlaylistSongs', function(){
      var resourceInstance = null;
      $httpBackend.when('POST', playlistService.listSongUrl(playlistService.path, '1')).respond(200, instanceJSON);
      $httpBackend.expectPOST(playlistService.listSongUrl(playlistService.path, '1'));
      playlistService.addPlaylistSongs('1', {}).then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance).toEqual(instanceJSON.data);
    });

    it('fails to call resource list song url from addPlaylistSongs', function(){
      var errorResponse = null;
      $httpBackend.when('POST', playlistService.listSongUrl(playlistService.path, '1')).respond(400);
      $httpBackend.expectPOST(playlistService.listSongUrl(playlistService.path, '1'));
      playlistService.addPlaylistSongs('1').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });

    it('calls resource list song url from removePlaylistSongs', function(){
      var resourceInstance = null;
      $httpBackend.when('DELETE', playlistService.listSongUrl(playlistService.path, '1')).respond(200, instanceJSON);
      $httpBackend.expectDELETE(playlistService.listSongUrl(playlistService.path, '1'));
      playlistService.removePlaylistSongs('1', {}).then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance).toEqual(instanceJSON.data);
    });

    it('fails to call resource list song url from removePlaylistSongs', function(){
      var errorResponse = null;
      $httpBackend.when('DELETE', playlistService.listSongUrl(playlistService.path, '1')).respond(400);
      $httpBackend.expectDELETE(playlistService.listSongUrl(playlistService.path, '1'));
      playlistService.removePlaylistSongs('1').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });
  });
})();
