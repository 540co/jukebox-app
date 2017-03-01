(function() {
  'use strict';

describe('Pager Service', function() {
    var pagerService = null;
    var linkHeader = '<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=0>; rel="first",<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=110>; rel="last",<https://dev.api.jukebox.540.co/v1/songs?limit=10&offset=10>; rel="next"';
    beforeEach(function(){
      module('app.services');

      inject(function(_pagerService_) {
        pagerService = _pagerService_;
      });

    });

    it('should return pager object', function(){
      var pager = pagerService.getPager('200', linkHeader, '10', null);

      expect(pager).toEqual(jasmine.any(Object));
      expect(pager.totalItems).toEqual('200');
    });

  });
})();
