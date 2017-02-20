(function() {
  'use strict';

  describe('Song Controller', function(){
    var vm = null;
    var playlistService = null;
    var songService = null;
    var controller = null;

    var data = {
        'data': {
          'meta': {
            'pagination': {
              'totalCount': '10'
            }
          }
        }
    };

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

    // TODO: Figure out how to mock $http response headers
    // it('should get a all songs on controller init', function() {
    //   spyOn(songService, 'all').and.callFake(function() {
    //     return {
    //       then: function(success) {
    //         success(data);
    //       }
    //     };
    //   });
    //
    //   vm = controller();
    //   expect(vm.songs.length).toEqual(2);
    // });

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

    it('should call paginate onChange with new link and page', function() {
      spyOn(songService, 'all').and.callThrough();
      vm = controller();
      vm.onChange('http://google.com', 2);
      expect(songService.all).toHaveBeenCalledWith('http://google.com', undefined);
      expect(vm.currentPage).toEqual(2);
    });

    it('should call songs with acending sort query', function() {
      spyOn(songService, 'all').and.callThrough();
      vm = controller();
      vm.sortSongs('name');
      expect(songService.all).toHaveBeenCalledWith(null, '?sort=name');
    });

    it('should call songs with descending sort query', function() {
      spyOn(songService, 'all').and.callThrough();
      vm = controller();
      vm.sortSongs('-name');
      expect(songService.all).toHaveBeenCalledWith(null, '?sort=-name');
    });

    it('should call songs with filter search query', function() {
      spyOn(songService, 'all').and.callThrough();
      vm = controller();
      vm.filterSearch('Spellbound');
      expect(songService.all).toHaveBeenCalledWith(null, '?filters=title==Spellbound');
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
