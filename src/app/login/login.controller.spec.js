(function() {
  'use strict';

  describe('Login Controller', function(){
    var $state, controller, authService,  vm;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$state_, _authService_) {
      authService = _authService_;
      $state = _$state_;

      spyOn($state, 'go');

      vm = _$controller_('LoginController');
    }));

    it('should successfully login', function() {
      spyOn(authService, 'setCredentials');
      spyOn(authService, 'login').and.callFake(function() {
        return {
          then: function(successCallback) {
            successCallback({});
          }
        };
      });

      vm.login('admin', 'password');

      expect(authService.setCredentials).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('home');
    });

    it('should fail to login', function() {
      spyOn(authService, 'login').and.callFake(function() {
        return {
          then: function(successCallback, errorCallback) {
            errorCallback({
              'data': {
                'error': 'foo'
              }
            });
          }
        };
      });

      vm.login('admin', 'bad');
      expect(vm.loginError).toEqual(jasmine.any(String));
    });

  });
})();
