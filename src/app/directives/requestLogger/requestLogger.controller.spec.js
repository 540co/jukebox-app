(function() {
  'use strict';

  describe('RequestLoggerController Controller', function(){
    var $state, controller, $rootScope, vm;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $rootScope = _$rootScope_;

      controller = function () {
        return _$controller_('RequestLoggerController', {
        });
      };
    }));

    it('should clear request logger', function() {
      vm = controller();
      vm.clearLog();

      expect($rootScope.calls.length).toEqual(0);
    });


  });
})();
