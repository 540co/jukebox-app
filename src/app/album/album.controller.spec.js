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

    // TODO: Figure out how to mock $http response headers
    // it('should get a all albums on controller init', function() {
    //   spyOn(albumService, 'all').and.callFake(function() {
    //     return {
    //       then: function(success) {
    //         success([{},{}]);
    //       }
    //     };
    //   });
    //
    //   vm = controller();
    //   expect(vm.albums.length).toEqual(2);
    // });

    it('should call paginate onChange with new link and page', function() {
      spyOn(albumService, 'all').and.callThrough();
      vm = controller();
      vm.onChange('http://google.com', 2);
      expect(albumService.all).toHaveBeenCalledWith('http://google.com', undefined);
      expect(vm.currentPage).toEqual(2);
    });

    it('should call artists with acending sort query', function() {
      spyOn(albumService, 'all').and.callThrough();
      vm = controller();
      vm.sortAlbums('title');
      expect(albumService.all).toHaveBeenCalledWith(null, '?sort=title');
    });

    it('should call artists with descending sort query', function() {
      spyOn(albumService, 'all').and.callThrough();
      vm = controller();
      vm.sortAlbums('-title');
      expect(albumService.all).toHaveBeenCalledWith(null, '?sort=-title');
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
