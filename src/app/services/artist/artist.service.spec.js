(function () {
  'use strict';

  describe('Artist Service', function() {
    var artistService = null;

    beforeEach(function() {
      module('app.services');
      inject(function(_artistService_) {
        artistService = _artistService_;
      });
    });

    it('sets up the resource', function() {
      expect(artistService.path).toEqual('/artists');
    });
  });
})();
