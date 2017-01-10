(function () {
  'use strict';

  describe('User Service', function() {
    var userService = null;

    beforeEach(function() {
      module('app.services');
      inject(function(_userService_) {
        userService = _userService_;
      });
    });

    it('sets up the resource', function() {
      expect(userService.path).toEqual('/users');
    });
  });
})();
