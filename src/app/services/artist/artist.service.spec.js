(function () {
  'use strict';

  describe('Artist Service', function() {
    var artistService = null;
    var $httpBackend = null;
    var instanceJSON = {"data": {}};

    beforeEach(function() {
      module('app.services');
      inject(function(_artistService_, _$httpBackend_) {
        artistService = _artistService_;
        $httpBackend = _$httpBackend_;
      });
    });

    it('sets up the resource', function() {
      expect(artistService.path).toEqual('/artists');
    });

    it('calls resource list album url from getArtistAlbums', function(){
      var resourceInstance = null;
      $httpBackend.when('GET', artistService.listAlbumUrl(artistService.path, '1')).respond(200, instanceJSON);
      $httpBackend.expectGET(artistService.listAlbumUrl(artistService.path, '1'));
      artistService.getArtistAlbums('1').then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance).toEqual(instanceJSON.data);
    });

    it('fails to call resource list album url from getArtistAlbums', function(){
      var errorResponse = null;
      $httpBackend.when('GET', artistService.listAlbumUrl(artistService.path, '1')).respond(400);
      $httpBackend.expectGET(artistService.listAlbumUrl(artistService.path, '1'));
      artistService.getArtistAlbums('1').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });
  });
})();
