(function () {
  'use strict';

  describe('Song Service', function() {
    var songService = null;

    beforeEach(function() {
      module('app.services');
      inject(function(_songService_) {
        songService = _songService_;
      });
    });

    it('sets up the resource', function() {
      expect(songService.path).toEqual('/songs');
    });
  });
})();
