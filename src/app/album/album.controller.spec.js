(function() {
  'use strict';

  describe('Album Controller', function(){
    var vm = null;
    var albumService = null;
    var controller = null;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _albumService_) {
      albumService = _albumService_;

      controller = function () {
        return _$controller_('AlbumController', {
          albumService: albumService
        });
      };
    }));

    it('should get a all albums on controller init', function() {
      spyOn(albumService, 'all').and.callFake(function() {
        return {
          then: function(success) {
            success([{},{}]);
          }
        };
      });

      vm = controller();
      expect(vm.albums.length).toEqual(2);
    });


    it('should fail to get albums', function() {
      spyOn(albumService, 'all').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();
      expect(vm.albums).toBe(null);
    });
  });
})();
