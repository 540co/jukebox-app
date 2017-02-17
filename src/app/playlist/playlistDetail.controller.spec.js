(function() {
  'use strict';

  describe('My Playlist Detail Controller', function(){
    var vm = null;
    var playlistService = null;
    var controller = null;
    var mockPlaylist = {'data':{'data':{'title': 'playlist1'}}};
    var mockSongs = [{'title': 'foo'}, {'title': 'bar'}];

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _playlistService_) {
      playlistService = _playlistService_;

      controller = function () {
        return _$controller_('PlaylistDetailController', {
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

    it('should add song to a playlist', function() {
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

    it('should fail to add song to a playlist', function() {
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      vm.addPlaylistSongs('1', '40');
    });
  });
})();
