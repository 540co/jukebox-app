(function() {
  'use strict';

  describe('Album Detail Controller', function(){
    var vm = null;
    var albumService = null;
    var playlistService = null;
    var controller = null;
    var toastr = null;
    var mockAlbum = {'data':{'data':{'title': 'album1'}}};
    var mockSongs = [{'title': 'foo'}, {'title': 'bar'}];

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _albumService_, _playlistService_, _toastr_) {
      albumService = _albumService_;
      playlistService = _playlistService_;
      toastr = _toastr_;

      controller = function () {
        return _$controller_('AlbumDetailController', {
          albumService: albumService,
          playlistService: playlistService,
          toastr: toastr
        });
      };
    }));

    it('should get album by ID on controller init', function() {
      spyOn(albumService, 'findById').and.callFake(function() {
        return {
          then: function(success) {
            success(mockAlbum);
          }
        };
      });
      vm = controller();
      expect(vm.album.title).toEqual('album1');
    });

    it('should get album songs on controller init', function() {
      spyOn(albumService, 'getAlbumSongs').and.callFake(function() {
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


    it('should fail to get artist by ID', function() {
      spyOn(albumService, 'findById').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      expect(vm.album).toBe(null);
    });

    it('should fail to get artist albums', function() {
      spyOn(albumService, 'getAlbumSongs').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      expect(vm.songs).toBe(null);
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
