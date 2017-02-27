(function() {
  'use strict';

  describe('Album Controller', function(){
    var vm = null;
    
    var albumService  = null;
    var controller    = null;
    var pagerService  = null;

    // mock variables
    // mock $http response headers for testing
    var mockHeaders = function(link) {
      return '<https://dev.api.jukebox.540.co/v1/playlists?limit=10&offset=0>; rel="first",<https://dev.api.jukebox.540.co/v1/playlists?limit=10&offset=0>; rel="last"';
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
    var mockAlbums = [
      {
        "id": 2,
        "href": "/v1/playlists/2",
        "name": "For Those About to Rock"
      },
      {
        "id": 3,
        "href": "/v1/playlists/3",
        "name": "Workout Mix"
      }
    ];
    var successReponse = {
      'headers': mockHeaders,
      'data':{
        'meta': mockMeta,
        'data': mockAlbums
      }
    };

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _albumService_, _pagerService_) {
      albumService = _albumService_;
      pagerService = _pagerService_;

      controller = function () {
        return _$controller_('AlbumController', {
          albumService: albumService,
          pagerService: pagerService
        });
      };
    }));

    it('should get a all albums on controller init', function() {
      spyOn(albumService, 'all').and.callFake(function() {
        return {
          then: function(success) {
            success(successReponse);
          }
        };
      });

      vm = controller();

      expect(vm.albums.length).toEqual(2);
      expect(vm.currentPage).toEqual(1);
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

      expect(vm.albums.length).toEqual(0);
    });

    it('should call paginate with next link path and page number', function() {
      spyOn(albumService, 'all').and.callThrough();

      vm = controller();
      vm.onChange('http://google.com', 2);

      expect(albumService.all).toHaveBeenCalledWith('http://google.com', undefined);
      expect(vm.currentPage).toEqual(2);
    });

    it('should call albums with acending sort query', function() {
      spyOn(albumService, 'all').and.callThrough();

      vm = controller();
      vm.sortAlbums('title');

      expect(albumService.all).toHaveBeenCalledWith(null, '?sort=title');
    });

    it('should call albums with descending sort query', function() {
      spyOn(albumService, 'all').and.callThrough();

      vm = controller();
      vm.sortAlbums('-title');

      expect(albumService.all).toHaveBeenCalledWith(null, '?sort=-title');
    });

    it('should call albums with filter search query', function() {
      spyOn(albumService, 'all').and.callThrough();

      vm = controller();
      vm.filterSearch('Let There Be Rock');

      expect(albumService.all).toHaveBeenCalledWith(null, '?filters=title==Let There Be Rock');
      expect(vm.currentPage).toEqual(1);
    });

  });
})();
