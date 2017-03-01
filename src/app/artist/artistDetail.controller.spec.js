(function() {
  'use strict';

  describe('Artist Detail Controller', function(){
    var vm = null;

    var $stateParams   = null;
    var artistService  = null;
    var controller     = null;

    // mock variables
    var mockArtist = {'data':{'data':{'name': 'AC/DC'}}};
    var mockAlbums = [{'title': 'album1'}, {'title': 'album2'}];

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$stateParams_, _artistService_) {
      $stateParams = _$stateParams_;
      artistService = _artistService_;

      controller = function () {
        return _$controller_('ArtistDetailController', {
          $stateParams: $stateParams,
          artistService: artistService
        });
      };
    }));

    it('should get artist by ID on controller init', function() {
      spyOn(artistService, 'findById').and.callFake(function() {
        return {
          then: function(getArtistComplete) {
            getArtistComplete(mockArtist);
          }
        };
      });

      vm = controller();

      expect(vm.artist.name).toEqual('AC/DC');
    });

    it('should fail to get artist by ID', function() {
      spyOn(artistService, 'findById').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      expect(vm.artist).toBe(null);
    });

    it('should get artist albums on controller init', function() {
      spyOn(artistService, 'getArtistAlbums').and.callFake(function() {
        return {
          then: function(success) {
            success(mockAlbums);
          }
        };
      });

      vm = controller();

      expect(vm.albums.length).toEqual(2);
    });

    it('should fail to get artist albums', function() {
      spyOn(artistService, 'getArtistAlbums').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });
      vm = controller();
      expect(vm.albums.length).toEqual(0);
    });

  });
})();
