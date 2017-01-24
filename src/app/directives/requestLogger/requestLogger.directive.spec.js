(function() {
  'use strict';

  describe('Directive requestLogger', function() {
    var $compile, $scope;

    // NOTE: need to manually inject all modules the navbar deals with (gulp is not injecting correctly)
    beforeEach(module('jukebox', 'app'));
    beforeEach(
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
    }));

    it('should compile the <jukebox-request-logger></jukebox-request-logger>', function() {
      var el = angular.element('<jukebox-request-logger></jukebox-request-logger>');

      $compile(el)($scope);
      $scope.$digest();
      expect(el.controller('jukeboxRequestLogger')).toBeDefined();
    });

  });
})();
