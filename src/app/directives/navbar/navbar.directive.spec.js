(function() {
  'use strict';

  describe('Directive Navbar', function() {
    var $compile, $scope;

    // NOTE: need to manually inject all modules the navbar deals with (gulp is not injecting correctly)
    beforeEach(module('jukebox', 'app'));
    beforeEach(
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
    }));

    it('should compile the <jukebox-navbar></jukebox-navbar>', function() {
      var el = angular.element('<jukebox-navbar></jukebox-navbar>');

      $compile(el)($scope);
      $scope.$digest();
      expect(el.controller('jukeboxNavbar')).toBeDefined();
    });

  });
})();
