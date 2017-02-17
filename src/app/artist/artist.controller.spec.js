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
