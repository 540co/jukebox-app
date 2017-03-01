(function() {
  'use strict';

  describe('My Playlist Detail Controller', function(){
    var vm = null;

    var $log             = null;
    var $state           = null;
    var $stateParams     = null;
    var controller       = null;
    var playlistService  = null;
    var toastr           = null;

    // mock variables
    var mockPlaylist = {'data': {'data':{'title': 'playlist1'}}};
    var mockSongs = [{'title': 'foo'}, {'title': 'bar'}];


    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$log_, _$state_, _$stateParams_, _playlistService_, _toastr_) {
      $log = _$log_;
      $state = _$state_;
      $stateParams = _$stateParams_;
      playlistService = _playlistService_;
      toastr = _toastr_;

      controller = function () {
        return _$controller_('MyPlaylistDetailController', {
          $log:$log,
          $state: $state,
          $stateParams: $stateParams,
          playlistService: playlistService,
          toastr: toastr
        });
      };
    }));

    it('should get playlist details on controller init', function() {
      spyOn(playlistService, 'findById').and.callFake(function() {
        return {
          then: function(success) {
            success(mockPlaylist);
          }
        };
      });

      vm = controller();
      expect(vm.playlist.title).toEqual('playlist1');
    });

    it('should fail to get playlist by Id', function() {
      spyOn(playlistService, 'findById').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();

      expect(vm.playlist).toBe(null);
    });

    it('should get playlist songs on controller init', function() {
      spyOn(playlistService, 'getPlaylistSongs').and.callFake(function() {
        return {
          then: function(success) {
            success(mockSongs);
          }
        };
      });
      vm = controller();

      expect(vm.songs.length).toEqual(2);
    });

    it('should fail to get playlist songs', function() {
      spyOn(playlistService, 'getPlaylistSongs').and.callFake(function() {
        return {
          then: function(removeSongComplete, removeSongFailed) {
            removeSongFailed({});
          }
        };
      });
      vm = controller();

      expect(vm.songs.length).toEqual(0);
    });

    it('should add a song to a playlist', function() {
      spyOn(toastr, 'success');
      spyOn($log, 'log');
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success) {
            success(mockSongs);
          }
        };
      });

      vm = controller();
      vm.addPlaylistSongs('2', '3');

      expect(toastr.success).toHaveBeenCalled();
      expect($log.log).toHaveBeenCalled();
    });

    it('should fail to add a song to a playlist', function() {
      spyOn(toastr, 'error');
      spyOn($log, 'error');
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      vm.addPlaylistSongs('foo', 'bar');

      expect(toastr.error).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalled();
    });

    it('should delete a song to a playlist', function() {
      spyOn($state, 'reload');
      spyOn($log, 'log');
      spyOn(playlistService, 'removePlaylistSongs').and.callFake(function() {
        return {
          then: function(success) {
            success(mockSongs);
          }
        };
      });
      vm = controller();
      vm.destroyPlaylistSongs('2', '3');

      expect(playlistService.removePlaylistSongs).toHaveBeenCalled();
      expect($log.log).toHaveBeenCalled();
      expect($state.reload).toHaveBeenCalled();
    });

    it('should fail to delete a song to a playlist', function() {
      spyOn(toastr, 'error');
      spyOn($log, 'error');
      spyOn(playlistService, 'removePlaylistSongs').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      vm.destroyPlaylistSongs('foo', 'bar');

      expect(toastr.error).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalled();
    });

    it('should delete a playlist', function() {
      spyOn(toastr, 'success');
      spyOn($log, 'log');
      spyOn(playlistService, 'destroy').and.callFake(function() {
        return {
          then: function(success) {
            success({});
          }
        };
      });

      vm = controller();
      vm.destroyPlaylist();

      expect(toastr.success).toHaveBeenCalled();
      expect($log.log).toHaveBeenCalled();
    });

    it('should fail to delete a playlist', function() {
      spyOn(toastr, 'error');
      spyOn($log, 'error');
      spyOn(playlistService, 'destroy').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();
      vm.destroyPlaylist('1');

      expect(toastr.error).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalled();
    });

  });
})();
