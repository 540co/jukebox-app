(function() {
  'use strict';

describe('Resource', function() {

    var $httpBackend = null;
    var Resource = null;
    var path = null;
    var resource = null;
    var listJSON = {"data": []};
    var instanceJSON = {"data": {}};

    beforeEach(function(){
      module('app.services');
      inject(function(_$httpBackend_, _Resource_){
        $httpBackend = _$httpBackend_;
        Resource = _Resource_;
      });
      path = '/path/to/resource';
      resource = new Resource(path);
    });

    it('calls resource list url', function(){
      $httpBackend.when('GET', resource.listUrl(path)).respond(200,'');
      $httpBackend.expectGET(resource.listUrl(path));
      resource.api.list();
      $httpBackend.flush();
    });

    it('calls resource instance url', function(){
      $httpBackend.when('GET', resource.instanceUrl(path, 'ABCD1234')).respond(200,'');
      $httpBackend.expectGET(resource.instanceUrl(path, 'ABCD1234'));
      resource.api.instanceById('ABCD1234');
      $httpBackend.flush();
    });

    it('calls create on resource list url', function(){
      $httpBackend.when('POST', resource.listUrl(path)).respond(201,'');
      $httpBackend.expectPOST(resource.listUrl(path));
      resource.api.create({});
      $httpBackend.flush();
    });

    it('calls update on resource instance url', function(){
      $httpBackend.when('PATCH', resource.instanceUrl(path, 'ABCD1234')).respond(200,'');
      $httpBackend.expectPATCH(resource.instanceUrl(path, 'ABCD1234'));
      resource.api.update('ABCD1234', {});
      $httpBackend.flush();
    });

    it('calls delete on resource instance url', function(){
      $httpBackend.when('DELETE', resource.instanceUrl(path, 'ABCD1234')).respond(204,'');
      $httpBackend.expectDELETE(resource.instanceUrl(path, 'ABCD1234'));
      resource.api.destroy('ABCD1234');
      $httpBackend.flush();
    });

    it('returns an array of resources', function(){
      var resourceArray = null;
      $httpBackend.when('GET', resource.listUrl(path)).respond(200, listJSON);
      $httpBackend.expectGET(resource.listUrl(path));
      resource.all().then(function(response){
        resourceArray = response;
      });
      $httpBackend.flush();
      expect(resourceArray.data.data).toEqual(listJSON.data);
    });

    it('fails to return an array of resources', function(){
      var errorResponse = null;
      $httpBackend.when('GET', resource.listUrl(path)).respond(400);
      $httpBackend.expectGET(resource.listUrl(path));
      resource.all().then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });

    it('calls resource instance url from findById', function(){
      var resourceInstance = null;
      $httpBackend.when('GET', resource.instanceUrl(path, 'ABCD1234')).respond(200, instanceJSON);
      $httpBackend.expectGET(resource.instanceUrl(path, 'ABCD1234'));
      resource.findById('ABCD1234').then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance.data.data).toEqual(instanceJSON.data);
    });

    it('fails to call resource instance url from findById', function(){
      var errorResponse = null;
      $httpBackend.when('GET', resource.instanceUrl(path, 'ABCD1234')).respond(400);
      $httpBackend.expectGET(resource.instanceUrl(path, 'ABCD1234'));
      resource.findById('ABCD1234').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });

    it('calls create on resource list url from create', function(){
      var resourceInstance = null;
      $httpBackend.when('POST', resource.listUrl(path)).respond(201, instanceJSON);
      $httpBackend.expectPOST(resource.listUrl(path));
      resource.create({}).then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance.data.data).toEqual(instanceJSON.data);
    });

    it('fails create on resource list url from create', function(){
      var errorResponse = null;
      $httpBackend.when('POST', resource.listUrl(path)).respond(400);
      $httpBackend.expectPOST(resource.listUrl(path));
      resource.create({}).then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });

    it('calls update on resource instance url from update', function(){
      var resourceInstance = null;
      $httpBackend.when('PATCH', resource.instanceUrl(path, 'ABCD1234')).respond(200, instanceJSON);
      $httpBackend.expectPATCH(resource.instanceUrl(path, 'ABCD1234'));
      resource.update('ABCD1234', {}).then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance.data.data).toEqual(instanceJSON.data);
    });

    it('fails update on resource instance url from update', function(){
      var errorResponse = null;
      $httpBackend.when('PATCH', resource.instanceUrl(path, 'ABCD1234')).respond(400);
      $httpBackend.expectPATCH(resource.instanceUrl(path, 'ABCD1234'));
      resource.update('ABCD1234', {}).then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });

    it('calls delete on resource instance url from destroy', function(){
      var resourceInstance = null;
      $httpBackend.when('DELETE', resource.instanceUrl(path, 'ABCD1234')).respond(204, instanceJSON);
      $httpBackend.expectDELETE(resource.instanceUrl(path, 'ABCD1234'));
      resource.destroy('ABCD1234').then(function(response){
        resourceInstance = response;
      });
      $httpBackend.flush();
      expect(resourceInstance.data.data).toEqual(instanceJSON.data);
    });

    it('fails delete on resource instance url from destroy', function(){
      var errorResponse = null;
      $httpBackend.when('DELETE', resource.instanceUrl(path, 'ABCD1234')).respond(400);
      $httpBackend.expectDELETE(resource.instanceUrl(path, 'ABCD1234'));
      resource.destroy('ABCD1234').then(null, function(e){
        errorResponse = e;
      });
      $httpBackend.flush();
      expect(errorResponse.status).toEqual(400);
    });
  });
})();
