(function() {
  'use strict';

  describe('Home Controller', function(){
    var vm = null;

    var controller   = null;
    var rootScope    = null;
    var userService  = null;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _userService_) {
      userService = _userService_;
      rootScope = {"globals": {"currentUser": {'id': '1'}}};

      controller = function () {
        return _$controller_('HomeController', {
          userService: userService,
          $rootScope: rootScope
        });
      };
    }));

    it('should get a all playlists on controller init', function() {
      spyOn(userService, 'getUserPlaylists').and.callFake(function() {
        return {
          then: function(success) {
            success([{},{}]);
          }
        };
      });

      vm = controller();

      expect(vm.playlists.length).toEqual(2);
    });

    it('should fail to get playlists', function() {
      spyOn(userService, 'getUserPlaylists').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();

      expect(vm.playlists.length).toEqual(0);

    });


  });
})();
