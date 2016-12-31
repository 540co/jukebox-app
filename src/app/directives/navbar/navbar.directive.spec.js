(function() {
  'use strict';

  describe('directive navbar', function() {
    var $compile, $scope;

    beforeEach(module('app.directives', 'jukebox'));
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
