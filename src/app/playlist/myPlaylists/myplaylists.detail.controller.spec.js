(function() {
  'use strict';

  describe('My Playlist Detail Controller', function(){
    var vm = null;
    var playlistService = null;
    var controller = null;
    var mockPlaylist = {'title': 'playlist1'};
    var mockSongs = [{'title': 'foo'}, {'title': 'bar'}];
    var $log;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$log_, _playlistService_) {
      $log = _$log_;
      playlistService = _playlistService_;

      controller = function () {
        return _$controller_('MyPlaylistDetailController', {
          $log:$log,
          playlistService: playlistService
        });
      };
    }));

    it('should get a all playlists on controller init', function() {
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

    it('should add a song to a playlist', function() {
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

      expect($log.log).toHaveBeenCalled();
    });

    it('should fail to add a song to a playlist', function() {
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

      expect($log.error).toHaveBeenCalled();
    });

    it('should delete a song to a playlist', function() {
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

      expect($log.log).toHaveBeenCalled();
    });

    it('should fail to delete a song to a playlist', function() {
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

      expect($log.error).toHaveBeenCalled();
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
      expect(vm.songs).toBe(null);
    });

    it('should fail to get playlists', function() {
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

    it('should delete a playlist', function() {
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

      expect($log.log).toHaveBeenCalled();
    });

  });
})();
