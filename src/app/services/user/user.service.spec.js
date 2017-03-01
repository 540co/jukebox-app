(function () {
  'use strict';

  describe('User Service', function() {
    var $httpBackend = null;
    var userService = null;
    var instanceJSON = {"data": {}};

    beforeEach(function() {
      module('app.services');
      inject(function(_$httpBackend_, _userService_) {
        $httpBackend = _$httpBackend_;
        userService = _userService_;
      });
    });

    it('sets up the resource', function() {
      expect(userService.path).toEqual('/users');
    });

    it('calls resource list current user url from getCurrentUser', function(){
      var resourceInstance = null;
      $httpBackend.when('GET', userService.listCurrentUrl(userService.path)).respond(200, instanceJSON);
      $httpBackend.expectGET(userService.listCurrentUrl(userService.path));
      userService.getCurrentUser('token').then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance).toEqual(instanceJSON.data);
    });

    it('fails to call resource list current user url from getCurrentUser', function(){
      var errorResponse = null;
      $httpBackend.when('GET', userService.listCurrentUrl(userService.path)).respond(400);
      $httpBackend.expectGET(userService.listCurrentUrl(userService.path));
      userService.getCurrentUser('token').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });

    it('calls resource user playlist url from getUserPlaylists', function(){
      var resourceInstance = null;
      $httpBackend.when('GET', userService.listPlaylistUrl(userService.path, '1')).respond(200, instanceJSON);
      $httpBackend.expectGET(userService.listPlaylistUrl(userService.path, '1'));
      userService.getUserPlaylists('1').then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance).toEqual(instanceJSON.data);
    });

    it('fails to call resource list current user url from getCurrentUser', function(){
      var errorResponse = null;
      $httpBackend.when('GET', userService.listPlaylistUrl(userService.path, '1')).respond(400);
      $httpBackend.expectGET(userService.listPlaylistUrl(userService.path, '1'));
      userService.getUserPlaylists('1').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });

  });
})();
