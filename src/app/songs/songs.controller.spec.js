(function() {
  'use strict';

  describe('Song Controller', function(){
    var vm = null;
    var playlistService = null;
    var songService = null;
    var controller = null;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _playlistService_, _songService_) {
      playlistService = _playlistService_;
      songService = _songService_;

      controller = function () {
        return _$controller_('SongController', {
          playlistService: playlistService,
          songService: songService
        });
      };
    }));

    it('should get a all songs on controller init', function() {
      spyOn(songService, 'all').and.callFake(function() {
        return {
          then: function(success) {
            success([{},{}]);
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


    it('should fail to get songs', function() {
      spyOn(songService, 'all').and.callFake(function() {
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
