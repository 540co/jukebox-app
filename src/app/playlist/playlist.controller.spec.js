(function() {
  'use strict';

  describe('Playlist Controller', function(){
    var vm = null;

    var controller       = null;
    var pagerService     = null;
    var playlistService  = null;

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
    var mockPlaylists = [
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
        'data': mockPlaylists
      }
    };

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _pagerService_, _playlistService_) {
      pagerService = _pagerService_;
      playlistService = _playlistService_;

      controller = function () {
        return _$controller_('PlaylistController', {
          pagerService: pagerService,
          playlistService: playlistService
        });
      };
    }));

    it('should get a all playlists on controller init', function() {
      spyOn(playlistService, 'all').and.callFake(function() {
        return {
          then: function(success) {
            success(successReponse);
          }
        };
      });

      vm = controller();

      expect(vm.playlists.length).toEqual(2);
      expect(vm.currentPage).toEqual(1);
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

      expect(vm.playlists.length).toEqual(0);
    });

    it('should call paginate with new link and page count', function() {
      spyOn(playlistService, 'all').and.callThrough();

      vm = controller();
      vm.onChange('http://google.com', 2);

      expect(playlistService.all).toHaveBeenCalledWith('http://google.com', undefined);
      expect(vm.currentPage).toEqual(2);
    });

    it('should call playlists with acending sort query', function() {
      spyOn(playlistService, 'all').and.callThrough();

      vm = controller();
      vm.sortPlaylist('name');

      expect(playlistService.all).toHaveBeenCalledWith(null, '?sort=name');
    });

    it('should call playlists with descending sort query', function() {
      spyOn(playlistService, 'all').and.callThrough();

      vm = controller();
      vm.sortPlaylist('-name');

      expect(playlistService.all).toHaveBeenCalledWith(null, '?sort=-name');
    });

    it('should call playlists with filter search query', function() {
      spyOn(playlistService, 'all').and.callThrough();

      vm = controller();
      vm.filterSearch('Coding Jamz');
      
      expect(playlistService.all).toHaveBeenCalledWith(null, '?filters=name==Coding Jamz');
    });

  });
})();
