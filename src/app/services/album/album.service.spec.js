(function () {
  'use strict';

  describe('Album Service', function() {
    var albumService = null;
    var $httpBackend = null;
    var instanceJSON = {"data": {}};

    beforeEach(function() {
      module('app.services');
      inject(function(_albumService_, _$httpBackend_) {
        albumService = _albumService_;
        $httpBackend = _$httpBackend_;
      });
    });

    it('sets up the resource', function() {
      expect(albumService.path).toEqual('/albums');
    });

    it('calls resource list song url from getAlbumSongs', function(){
      var resourceInstance = null;
      $httpBackend.when('GET', albumService.listSongUrl(albumService.path, '1')).respond(200, instanceJSON);
      $httpBackend.expectGET(albumService.listSongUrl(albumService.path, '1'));
      albumService.getAlbumSongs('1').then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance).toEqual(instanceJSON.data);
    });

    it('fails to call resource list song url from getAlbumSongs', function(){
      var errorResponse = null;
      $httpBackend.when('GET', albumService.listSongUrl(albumService.path, '1')).respond(400);
      $httpBackend.expectGET(albumService.listSongUrl(albumService.path, '1'));
      albumService.getAlbumSongs('1').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });
  });
})();
