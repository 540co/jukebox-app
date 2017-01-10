(function () {
  'use strict';

  describe('Album Service', function() {
    var albumService = null;

    beforeEach(function() {
      module('app.services');
      inject(function(_albumService_) {
        albumService = _albumService_;
      });
    });

    it('sets up the resource', function() {
      expect(albumService.path).toEqual('/albums');
    });
  });
})();
