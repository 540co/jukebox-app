(function() {
  'use strict';

  describe('Song Detail Controller', function(){
    var vm = null;
    var songService = null;
    var playlistService = null;
    var controller = null;
    var mockSong = {'title': 'song1'};
    var mockSongs = [{'title': 'foo'}, {'title': 'bar'}];

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _songService_, _playlistService_) {
      songService = _songService_;
      playlistService = _playlistService_;

      controller = function () {
        return _$controller_('SongDetailController', {
          songService: songService,
          playlistService: playlistService
        });
      };
    }));

    it('should get song by ID on controller init', function() {
      spyOn(songService, 'findById').and.callFake(function() {
        return {
          then: function(success) {
            success(mockSong);
          }
        };
      });
      vm = controller();
      expect(vm.song.title).toEqual('song1');
    });

    it('should fail to get song by ID', function() {
      spyOn(songService, 'findById').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      expect(vm.song).toBe(null);
    });


    it('should add a song to a playlist', function() {
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success) {
            success(mockSongs);
          }
        };
      });
      vm = controller();
      vm.addPlaylistSongs('2', '3');

    });

    it('should fail to add a song to a playlist', function() {
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      vm.addPlaylistSongs('foo', 'bar');
    });

  });
})();
