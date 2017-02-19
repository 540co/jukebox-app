(function() {
  'use strict';

  describe('Artist Controller', function(){
    var vm = null;
    var artistService = null;
    var controller = null;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _artistService_) {
      artistService = _artistService_;

      controller = function () {
        return _$controller_('ArtistController', {
          artistService: artistService
        });
      };
    }));

    // TODO: Figure out how to mock $http response headers
    // it('should get a all artists on controller init', function() {
    //   spyOn(artistService, 'all').and.callFake(function() {
    //     return {
    //       then: function(getArtistsComplete) {
    //         getArtistsComplete([{},{}]);
    //       }
    //     };
    //   });
    //
    //   vm = controller();
    //   expect(vm.artists.length).toEqual(2);
    // });

    it('should call paginate onChange with new link and page', function() {
      spyOn(artistService, 'all').and.callThrough();
      vm = controller();
      vm.onChange('http://google.com', 2);
      expect(artistService.all).toHaveBeenCalledWith('http://google.com', undefined);
      expect(vm.currentPage).toEqual(2);
    });

    it('should call artists with acending sort query', function() {
      spyOn(artistService, 'all').and.callThrough();
      vm = controller();
      vm.sortArtist('name');
      expect(artistService.all).toHaveBeenCalledWith(null, '?sort=name');
    });

    it('should call artists with descending sort query', function() {
      spyOn(artistService, 'all').and.callThrough();
      vm = controller();
      vm.sortArtist('-name');
      expect(artistService.all).toHaveBeenCalledWith(null, '?sort=-name');
    });

    it('should fail to get artists', function() {
      spyOn(artistService, 'all').and.callFake(function() {
        return {
          then: function(getArtistsComplete, getArtistsFailed) {
            getArtistsFailed({});
          }
        };
      });

      vm = controller();
      expect(vm.artists).toBe(null);
    });
  });
})();
