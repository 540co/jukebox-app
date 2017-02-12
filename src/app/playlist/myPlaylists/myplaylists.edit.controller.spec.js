(function() {
  'use strict';

  describe('My Playlist Edit Controller', function(){
    var vm = null;
    var playlistService = null;
    var controller = null;
    var mockPlaylist = {'name': 'playlist1'};
    var $log;
    var $rootScope;
    var $state;
    var $stateParams;

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
      $stateParams = {
        'playlistId': '12345678'
      };
      $state = _$state_;

      controller = function () {
        return _$controller_('MyPlaylistEditController', {
          $log:$log,
          playlistService: playlistService,
          $rootScope: $rootScope,
          $state: $state,
          $stateParams: $stateParams
        });
      };
    }));

    it('should get playlist on controller init', function() {
      spyOn(playlistService, 'findById').and.callFake(function() {
        return {
          then: function(success) {
            success(mockPlaylist);
          }
        };
      });

      vm = controller();
      expect(vm.playlist.name).toEqual(mockPlaylist.name);
    });

    it('should edit a playlist', function() {
      spyOn($state, 'reload');

      spyOn(playlistService, 'update').and.callFake(function() {
        return {
          then: function(success) {
            success(mockPlaylist);
          }
        };
      });

      vm = controller();

      vm.playlist = {'name': 'foo'};
      vm.submit();
      expect(playlistService.update).toHaveBeenCalled();
    });

    it('should fail to edit a playlist', function() {
      spyOn($log, 'error');

      spyOn(playlistService, 'update').and.callFake(function() {
        return {
          then: function(success, err) {
            err({});
          }
        };
      });

      vm = controller();

      vm.submit();
      expect($log.error).toHaveBeenCalled();
    });

    it('should cancel the form', function() {
      spyOn($state, 'go');

      vm = controller();

      vm.cancel();
      expect($state.go).toHaveBeenCalledWith('myPlaylists', jasmine.any(Object));
    });

  });
})();
