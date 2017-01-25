(function() {
  'use strict';

  describe('Song Detail Controller', function(){
    var vm = null;
    var songService = null;
    var controller = null;
    var mockSong = {'title': 'song1'};

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _songService_) {
      songService = _songService_;

      controller = function () {
        return _$controller_('SongDetailController', {
          songService: songService
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

  });
})();
