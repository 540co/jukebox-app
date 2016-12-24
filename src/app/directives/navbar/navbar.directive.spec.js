(function() {
  'use strict';

  describe('directive navbar', function() {
    var el;

    beforeEach(module('jukeboxApp'));
    beforeEach(inject(function($compile, $rootScope) {
      el = angular.element('<jukebox-navbar></jukebox-navbar>');

      $compile(el)($rootScope.$new());
      $rootScope.$digest();
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

  });
})();
