(function() {
  'use strict';

  describe('My Playlist Create Controller', function(){
    var vm = null;
    var playlistService = null;
    var controller = null;
    var mockPlaylist = {'id': '123456', 'name': 'playlist1'};
    var $log;
    var $rootScope;
    var $state;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$log_, _$state_, _playlistService_) {
      $log = _$log_;
      playlistService = _playlistService_;
      $rootScope = {
        'globals': {
          'currentUser': {
            'id': '12345678',
            'name': 'hodor'
          }
        }
      };
      $state = _$state_;

      controller = function () {
        return _$controller_('MyPlaylistCreateController', {
          $log:$log,
          playlistService: playlistService,
          $rootScope: $rootScope,
          $state: $state
        });
      };
    }));

    it('should create a new playlist', function() {
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
    });

    it('should fail to create a new playlist', function() {
      spyOn(playlistService, 'create').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();

      vm.playlist = mockPlaylist;
      vm.submit();
      expect(playlistService.create).toHaveBeenCalled();
    });


    it('should cancel the form', function() {
      spyOn($state, 'go');

      vm = controller();

      vm.cancel();
      expect($state.go).toHaveBeenCalledWith('myPlaylists', jasmine.any(Object));
    });
  });
})();
