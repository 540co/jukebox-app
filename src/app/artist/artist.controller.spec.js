(function() {
  'use strict';

  describe('Artist Controller', function(){
    var vm = null;
    
    var controller     = null;
    var artistService  = null;
    var pagerService   = null;

    // mock variables
    // mock $http response headers for testing
    var mockHeaders = function(link) {
      return '<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=0>; rel="first",<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=110>; rel="last",<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=10>; rel="next"';
    };
    var mockMeta = {
      "responseTime": "0.042673",
      "responseType": "Playlist",
      "user": 1,
      "pagination": {
        "limit": 10,
        "offset": 0,
        "count": 6,
        "totalCount": 6
      }
    };
    var mockSongs = [
      {
        "id": 1,
        "href": "/v1/songs/1",
        "title": "For Those About to Rock (We Salute You)",
        "duration": "5:44"
      },
      {
        "id": 2,
        "href": "/v1/songs/2",
        "title": "Put the Finger on You",
        "duration": "3:25"
      }
    ];
    var successReponse = {
      'headers': mockHeaders,
      'data':{
        'meta': mockMeta,
        'data': mockSongs
      }
    };

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _artistService_, _pagerService_) {
      artistService = _artistService_;
      pagerService = _pagerService_;

      controller = function () {
        return _$controller_('ArtistController', {
          artistService: artistService,
          pagerService: pagerService
        });
      };
    }));

    it('should get a all artists on controller init', function() {
      spyOn(artistService, 'all').and.callFake(function() {
        return {
          then: function(success) {
            success(successReponse);
          }
        };
      });

      vm = controller();

      expect(vm.artists.length).toEqual(2);
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

      expect(vm.artists.length).toEqual(0);
    });

    it('should call paginate with link and page count', function() {
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

    it('should call artists with filter search query', function() {
      spyOn(artistService, 'all').and.callThrough();

      vm = controller();
      vm.filterSearch('AC/DC');

      expect(artistService.all).toHaveBeenCalledWith(null, '?filters=name==AC/DC');
    });

  });
})();
