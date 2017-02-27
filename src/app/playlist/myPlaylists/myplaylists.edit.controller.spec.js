(function() {
  'use strict';

  describe('My Playlist Edit Controller', function(){
    var vm = null;

    var $rootScope       = null;
    var $state           = null;
    var $stateParams     = null;
    var controller       = null;
    var playlistService  = null;
    var toastr           = null;

    // mock variables
    var mockPlaylist = {'data':{'data':{'data': {'name': 'playlist1'}}}};

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$state_, _playlistService_, _toastr_) {
      $rootScope = {
        'globals': {
          'currentUser': {
            'id': '12345678',
            'name': 'hodor'
          }
        }
      };
      $state = _$state_;
      $stateParams = {
        'playlistId': '12345678'
      };
      playlistService = _playlistService_;
      toastr = _toastr_;

      controller = function () {
        return _$controller_('MyPlaylistEditController', {
          $rootScope: $rootScope,
          $state: $state,
          $stateParams: $stateParams,
          playlistService: playlistService,
          toastr: toastr
        });
      };
    }));

    it('should get playlist by ID on controller init', function() {
      spyOn(playlistService, 'findById').and.callFake(function() {
        return {
          then: function(success) {
            success(mockPlaylist);
          }
        };
      });

      vm = controller();

      expect(vm.playlist.name).toEqual(mockPlaylist.name);
    });

    it('should fail to get playlist by ID on controller init', function() {
      spyOn(toastr, 'error');
      spyOn(playlistService, 'findById').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();

      expect(vm.playlist).toBe(undefined);
      expect(toastr.error).toHaveBeenCalled();
    });

    it('should edit a playlist', function() {
      spyOn(toastr, 'success');
      spyOn($state, 'reload');
      spyOn(playlistService, 'update').and.callFake(function() {
        return {
          then: function(success) {
            success(mockPlaylist);
          }
        };
      });

      vm = controller();

      vm.playlist = {'name': 'foo'};
      vm.submit();

      expect(playlistService.update).toHaveBeenCalled();
      expect(toastr.success).toHaveBeenCalled();
    });

    it('should fail to edit a playlist', function() {
      spyOn(toastr, 'error');
      spyOn(playlistService, 'update').and.callFake(function() {
        return {
          then: function(success, err) {
            err({'data':{'error':{}}});
          }
        };
      });

      vm = controller();
      vm.submit();

      expect(playlistService.update).toHaveBeenCalled();
      expect(toastr.error).toHaveBeenCalled();
    });

    it('should cancel the form', function() {
      spyOn($state, 'go');

      vm = controller();
      vm.cancel();
      
      expect($state.go).toHaveBeenCalledWith('myPlaylists', jasmine.any(Object));
    });

  });
})();
