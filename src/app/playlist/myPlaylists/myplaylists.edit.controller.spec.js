(function() {
  'use strict';

  describe('My Playlist Edit Controller', function(){
    var vm = null;
    var playlistService = null;
    var controller = null;
    var $log;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$log_, _playlistService_) {
      $log = _$log_;
      playlistService = _playlistService_;

      controller = function () {
        return _$controller_('MyPlaylistEditController', {
          $log:$log,
          playlistService: playlistService
        });
      };
    }));
  });
})();
