(function() {
  'use strict';

describe('Config Service', function() {

    var configService = null;
    var configDataMock = {
      'baseUrl': 'http://url.com',
      'bearerToken': 'abc'
    };

    beforeEach(function(){
      module('app.services');
      inject(function(_configService_){
        configService = _configService_;
      });

      // Return mock config data
      spyOn(configService, 'getConfig').and.returnValue(configDataMock);
    });

    it('returns the config data', function(){
      var configData = configService.getConfig();
      expect(configService.getConfig.calls.count()).toEqual(1);
      expect(configData.baseUrl).toEqual(configDataMock.baseUrl);
      expect(configData.bearerToken).toEqual(configDataMock.bearerToken);
    });

  });
})();
