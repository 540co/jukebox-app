(function() {
  'use strict';

  describe('Directive Collapse Toggler', function() {
    var $log;
    var vm;
    var el;

    beforeEach(module('app.directives'));
    beforeEach(inject(function($compile, $rootScope, _$log_) {
      $log = _$log_;

      el = angular.element('<div collapse-toggler>foo</div>');

      $compile(el)($rootScope.$new());
      $rootScope.$digest();
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    // TODO: test the link function

  });
})();
