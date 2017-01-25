(function() {
  'use strict';

  describe('Song Controller', function(){
    var vm = null;
    var songService = null;
    var controller = null;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _songService_) {
      songService = _songService_;

      controller = function () {
        return _$controller_('SongController', {
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
  });
})();
