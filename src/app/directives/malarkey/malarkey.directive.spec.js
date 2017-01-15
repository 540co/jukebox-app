(function() {
  'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * The `link` function is not tested.
   */
  describe('Directive Malarkey', function() {
    var $log;
    var vm;
    var el;

    beforeEach(module('app.directives'));
    beforeEach(inject(function($compile, $rootScope, _$log_) {
      $log = _$log_;

      el = angular.element('<jukebox-malarkey extra-values="[\'Poney\', \'Monkey\']"></jukebox-malarkey>');

      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      vm = el.isolateScope().vm;
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    it('should have isolate scope object with instanciate members', function() {
      expect(vm).toEqual(jasmine.any(Object));

      expect(vm.values).toEqual(jasmine.any(Array));
      expect(vm.values.length).toEqual(4);
    });

  });
})();
