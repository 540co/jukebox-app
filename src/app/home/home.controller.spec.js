(function() {
  'use strict';

  describe('Home Controller', function(){
    var vm;
    var controller;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_) {
      controller = function () {
        return _$controller_('HomeController', {
        });
      };
    }));

    it('should have a defined controller', function() {
      vm = controller();
      expect(vm).toBeDefined();
    });


  });
})();
