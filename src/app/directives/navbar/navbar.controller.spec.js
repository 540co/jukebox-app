(function() {
  'use strict';

  describe('Navbar Controller', function(){
    var $state, controller, authService,  vm;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$state_, _authService_) {
      authService = _authService_;
      $state = _$state_;

      spyOn($state, 'go');

      vm = _$controller_('NavbarController');
    }));

    it('should successfully login', function() {
      spyOn(authService, 'clearCredentials');

      vm.logout();

      expect(authService.clearCredentials).toHaveBeenCalled();
    });

  });
})();
