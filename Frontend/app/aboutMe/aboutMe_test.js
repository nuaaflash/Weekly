'use strict';

describe('myApp.aboutMe module', function() {

  beforeEach(module('myApp.aboutMe'));

  describe('aboutMe controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var aboutMeCtrl = $controller('aboutMeCtrl');
      expect(aboutMeCtrl).toBeDefined();
    }));

  });
});