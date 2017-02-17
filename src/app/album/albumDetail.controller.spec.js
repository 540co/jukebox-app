(function() {
  'use strict';

  describe('Album Detail Controller', function(){
    var vm = null;
    var albumService = null;
    var controller = null;
    var mockAlbum = {'data':{'data':{'title': 'album1'}}};
    var mockSongs = [{'title': 'foo'}, {'title': 'bar'}];

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _albumService_) {
      albumService = _albumService_;

      controller = function () {
        return _$controller_('AlbumDetailController', {
          albumService: albumService
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

  });
})();
