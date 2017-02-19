(function() {
  'use strict';

  describe('Playlist Controller', function(){
    var vm = null;
    var playlistService = null;
    var controller = null;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _playlistService_) {
      playlistService = _playlistService_;

      controller = function () {
        return _$controller_('PlaylistController', {
          playlistService: playlistService
        });
      };
    }));

    // TODO: Figure out how to mock $http response headers
    // it('should get a all playlists on controller init', function() {
    //   spyOn(playlistService, 'all').and.callFake(function() {
    //     return {
    //       then: function(success) {
    //         success([{},{}]);
    //       }
    //     };
    //   });
    //
    //   vm = controller();
    //   expect(vm.playlists.length).toEqual(2);
    // });

    it('should call paginate onChange with new link and page', function() {
      spyOn(playlistService, 'all').and.callThrough();
      vm = controller();
      vm.onChange('http://google.com', 2);
      expect(playlistService.all).toHaveBeenCalledWith('http://google.com', undefined);
      expect(vm.currentPage).toEqual(2);
    });

    it('should call playlists with acending sort query', function() {
      spyOn(playlistService, 'all').and.callThrough();
      vm = controller();
      vm.sortPlaylist('name');
      expect(playlistService.all).toHaveBeenCalledWith(null, '?sort=name');
    });

    it('should call playlists with descending sort query', function() {
      spyOn(playlistService, 'all').and.callThrough();
      vm = controller();
      vm.sortPlaylist('-name');
      expect(playlistService.all).toHaveBeenCalledWith(null, '?sort=-name');
    });

    it('should fail to get playlists', function() {
      spyOn(playlistService, 'all').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();
      expect(vm.playlists).toBe(null);
    });
  });
})();
