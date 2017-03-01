
(function() {
  'use strict';

  /**
   * @desc collapseToggler directive that can be used anywhere across the app
   */
  angular
    .module('app.directives')
    .directive('collapseToggler', collapseToggler);

  function collapseToggler() {
    var directive = {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.on('click', function() {
          $(this).siblings('.collapse').toggleClass('in');
        });
      }
    };

    return directive;
  }

})();
