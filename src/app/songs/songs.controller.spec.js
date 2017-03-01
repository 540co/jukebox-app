(function() {
  'use strict';

  describe('Song Controller', function(){
    var vm = null;

    var $state           = null;
    var controller       = null;
    var pagerService     = null;
    var playlistService  = null;
    var songService      = null;
    var toastr           = null;

    // mock variables
    // mock $http response headers for testing
    var mockHeaders = function(link) {
      return '<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=0>; rel="first",<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=110>; rel="last",<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=10>; rel="next"';
    };
    var mockMeta = {
      "responseTime": "0.042673",
      "responseType": "Song",
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
    beforeEach(inject(function(_$controller_, _$state_, _pagerService_, _playlistService_, _songService_, _toastr_) {
      $state = _$state_;
      pagerService = _pagerService_;
      playlistService = _playlistService_;
      songService = _songService_;
      toastr = _toastr_;

      controller = function () {
        return _$controller_('SongController', {
          $state: $state,
          pagerService: pagerService,
          playlistService: playlistService,
          songService: songService,
          toastr: toastr
        });
      };
    }));

    it('should get a all songs on controller init', function() {
      spyOn(songService, 'all').and.callFake(function() {
        return {
          then: function(success) {
            success(successReponse);
          }
        };
      });

      vm = controller();

      expect(vm.songs.length).toEqual(2);
      expect(vm.currentPage).toEqual(1);
    });

    it('should fail to get songs on controller init', function() {
      spyOn(songService, 'all').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();

      expect(vm.songs.length).toEqual(0);
    });

    it('should add song to a playlist', function() {
      spyOn(toastr, 'success').and.callThrough();
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success) {
            success({});
          }
        };
      });

      vm = controller();
      vm.addPlaylistSongs('1', '40');

      expect(playlistService.addPlaylistSongs).toHaveBeenCalled();
      expect(toastr.success).toHaveBeenCalled();
    });

    it('should fail to add song to a playlist', function() {
      spyOn(toastr, 'error').and.callThrough();
      spyOn(playlistService, 'addPlaylistSongs').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();
      vm.addPlaylistSongs('1', '40');

      expect(toastr.error).toHaveBeenCalled();
    });

    it('should call paginate onChange with new link and page count', function() {
      spyOn(songService, 'all').and.callThrough();

      vm = controller();
      vm.onChange('http://google.com', 2);

      expect(songService.all).toHaveBeenCalledWith('http://google.com', undefined);
      expect(vm.currentPage).toEqual(2);
    });

    it('should call songs with acending sort query', function() {
      spyOn(songService, 'all').and.callThrough();

      vm = controller();
      vm.sortSongs('name');

      expect(songService.all).toHaveBeenCalledWith(null, '?sort=name');
    });

    it('should call songs with descending sort query', function() {
      spyOn(songService, 'all').and.callThrough();

      vm = controller();
      vm.sortSongs('-name');

      expect(songService.all).toHaveBeenCalledWith(null, '?sort=-name');
    });

    it('should call songs with filter search query', function() {
      spyOn(songService, 'all').and.callThrough();

      vm = controller();
      vm.filterSearch('Spellbound');
      
      expect(songService.all).toHaveBeenCalledWith(null, '?filters=title==Spellbound');
    });

  });
})();
