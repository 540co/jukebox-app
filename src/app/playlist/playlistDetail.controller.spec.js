(function() {
  'use strict';

  describe('My Playlist Detail Controller', function(){
    var vm = null;

    var $log             = null;
    var $stateParams     = null;
    var controller       = null;
    var playlistService  = null;
    var toastr           = null;

    // mock variables
    var mockPlaylist = {'data':{'data':{'title': 'playlist1'}}};
    var mockSongs = [{'title': 'foo'}, {'title': 'bar'}];

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$log_, _$stateParams_, _playlistService_, _toastr_) {
      $log = _$log_;
      $stateParams = _$stateParams_;
      playlistService = _playlistService_;
      toastr = _toastr_;

      controller = function () {
        return _$controller_('PlaylistDetailController', {
          $log: $log,
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

      expect(vm.playlist.title).toEqual('playlist1');
    });

    it('should fail to get playlist by ID', function() {
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
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();

      expect(vm.songs.length).toEqual(0);
    });

    it('should add song to a playlist', function() {
      spyOn(toastr, 'success').and.callThrough();
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success) {
            success({});
          }
        };
      });

      vm = controller();
      vm.addPlaylistSongs('1', '40');

      expect(playlistService.addPlaylistSongs).toHaveBeenCalled();
      expect(toastr.success).toHaveBeenCalled();
    });

    it('should fail to add song to a playlist', function() {
      spyOn(toastr, 'error').and.callThrough();
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();
      vm.addPlaylistSongs('1', '40');

      expect(toastr.error).toHaveBeenCalled();
    });
  });
})();
