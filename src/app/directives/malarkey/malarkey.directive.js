(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('jukeboxMalarkey', jukeboxMalarkey);

  /** @ngInject */
  function jukeboxMalarkey(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '='
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: true,
        postfix: ' '
      });

      el.addClass('jukebox-malarkey');

      angular.forEach(scope.extraValues, function(value) {
        typist.type(value).pause().delete();
      });

      angular.forEach(vm.values, function(value) {
        typist.type(value).pause().delete();
      });
    }

    /** @ngInject */
    function MalarkeyController($log) {
      var vm = this;

      vm.values = ['Artists', 'Songs', 'Playlists', 'Albums'];
    }

  }

})();
