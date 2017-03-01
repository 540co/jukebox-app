(function() {
  'use strict';

describe('Auth Service', function() {

    var authService = null;
    var $cookies = null;
    var $http = null;
    var $rootScope = null;
    var md5 = null;
    var userService = null;

    beforeEach(function(){
      module('app.services');
      inject(function(_$cookies_, _$http_, _$rootScope_, _authService_, _userService_, _md5_) {
        $cookies = _$cookies_;
        $http = _$http_;
        $rootScope = _$rootScope_;
        authService = _authService_;
        userService = _userService_;
        md5 = _md5_;
      });

      spyOn(md5, 'createHash').and.callThrough();

    });

    it('should MD5 hash the username and password', function(){
      spyOn(userService, 'getCurrentUser');
      authService.login('foo', 'bar');
      expect(md5.createHash).toHaveBeenCalled();
    });

    it('should set correct auth credentials', function(){
      var username = 'ironman';
      var password = 'password';
      var tokenMock = md5.createHash(username + ':' + password);
      var user = {
        'username': 'ironman',
        'firstName': 'Tony',
        'lastName': 'Stark'
      };

      authService.setCredentials(username, password, user);
      var currentUser = $cookies.getObject('globals').currentUser;

      expect($http.defaults.headers.common.Authorization).toEqual('Bearer '+ tokenMock);
      expect(currentUser).toEqual(jasmine.objectContaining(user));
      expect(md5.createHash).toHaveBeenCalled();
    });

    it('should clear auth credentials', function(){
      authService.clearCredentials();
      // check globals
      expect($rootScope.globals.username).not.toBeDefined();
      expect($rootScope.globals.firstName).not.toBeDefined();
      expect($rootScope.globals.lastName).not.toBeDefined();

      // check cookie has been deleted
      expect($cookies.getObject('globals')).not.toBeDefined();

      // check auth header has been changed
      expect($http.defaults.headers.common.Authorization).toEqual('Basic');
    });

  });
})();
