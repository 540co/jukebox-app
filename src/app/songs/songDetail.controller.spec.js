(function() {
  'use strict';

  describe('Song Detail Controller', function(){
    var vm = null;

    var $log             = null;
    var $stateParams     = null;
    var controller       = null;
    var playlistService  = null;
    var songService      = null;

    // mock variables
    var mockSong = {'data':{'data':{'title': 'song1'}}};
    var mockSongs = [{'title': 'foo'}, {'title': 'bar'}];

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$log_, _$stateParams_, _songService_, _playlistService_) {
      $log = _$log_;
      $stateParams = _$stateParams_;
      songService = _songService_;
      playlistService = _playlistService_;

      controller = function () {
        return _$controller_('SongDetailController', {
          $log: $log,
          $stateParams: $stateParams,
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
      spyOn($log, 'log');
      spyOn(songService, 'findById').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();

      expect(vm.song).toBe(null);
      expect($log.log).toHaveBeenCalled();
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
      spyOn($log, 'log');
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      vm.addPlaylistSongs('foo', 'bar');

      expect($log.log).toHaveBeenCalled();
    });

  });
})();
