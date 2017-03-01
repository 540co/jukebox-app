(function() {
  'use strict';

  describe('My Playlist Create Controller', function(){
    var vm = null;

    var $rootScope        = null;
    var $state           = null;
    var controller       = null;
    var playlistService  = null;
    var toastr           = null;

    // mock variables
    var mockPlaylist = {'data':{'data':{'data':{'id': '123456', 'name': 'playlist1'}}}};

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$state_, _playlistService_, _toastr_) {
      $rootScope = {
        'globals': {
          'currentUser': {
            'id': '12345678',
            'name': 'hodor'
          }
        }
      };
      $state = _$state_;
      playlistService = _playlistService_;
      toastr = _toastr_;

      controller = function () {
        return _$controller_('MyPlaylistCreateController', {
          $rootScope: $rootScope,
          $state: $state,
          playlistService: playlistService,
          toastr: toastr
        });
      };
    }));

    it('should create a new playlist', function() {
      spyOn(toastr, 'success');
      spyOn(playlistService, 'create').and.callFake(function() {
        return {
          then: function(success) {
            success(mockPlaylist);
          }
        };
      });

      vm = controller();

      vm.playlist = mockPlaylist;
      vm.submit();

      expect(playlistService.create).toHaveBeenCalled();
      expect(toastr.success).toHaveBeenCalled();
    });

    it('should fail to create a new playlist', function() {
      spyOn(toastr, 'error');
      spyOn(playlistService, 'create').and.callFake(function() {
        return {
          then: function(success, err) {
            err({'data':{'error':{}}});
          }
        };
      });

      vm = controller();

      vm.playlist = mockPlaylist;
      vm.submit();

      expect(playlistService.create).toHaveBeenCalled();
      expect(toastr.error).toHaveBeenCalled();
    });


    it('should cancel the form', function() {
      spyOn($state, 'go');

      vm = controller();
      vm.cancel();
      
      expect($state.go).toHaveBeenCalledWith('myPlaylists', jasmine.any(Object));
    });
  });
})();
