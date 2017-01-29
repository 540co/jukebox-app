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
        return _$controller_('SongController', {
          playlistService: playlistService
        });
      };
    }));

    it('should get a all playlists on controller init', function() {
      spyOn(playlistService, 'all').and.callFake(function() {
        return {
          then: function(success) {
            success([{},{}]);
          }
        };
      });

      vm = controller();
      expect(vm.playlists.length).toEqual(2);
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
