(function() {
  'use strict';

  angular
    .module('app', [
      'app.album',
      'app.artist',
    	'app.core',
    	'app.directives',
      'app.home',
      'app.playlist',
      'app.login',
      'app.services',
      'app.songs'
    ]);

})();
