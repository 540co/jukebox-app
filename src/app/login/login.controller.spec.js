(function() {
  'use strict';

  describe('Login Controller', function(){
    var vm = null;

    var $state       = null;
    var authService  = null;
    var controller   = null;
    var toastr       = null;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$state_, _authService_, _toastr_) {
      $state = _$state_;
      authService = _authService_;
      toastr = _toastr_;

      spyOn($state, 'go');

      vm = _$controller_('LoginController');
    }));

    it('should successfully login', function() {
      spyOn(authService, 'setCredentials');
      spyOn(toastr, 'info');
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
      expect(toastr.info).toHaveBeenCalled();
    });

    it('should fail to login', function() {
      spyOn(toastr, 'error');
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
      expect(toastr.error).toHaveBeenCalled();
    });

  });
})();
