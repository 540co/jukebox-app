(function() {
  'use strict';

  describe('Info Controller', function(){
    var vm;
    var controller;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_) {
      controller = function () {
        return _$controller_('InfoController', {
        });
      };
    }));

    it('should have a defined controller', function() {
      vm = controller();
      expect(vm).toBeDefined();
    });


  });
})();
