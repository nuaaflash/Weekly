'use strict';

angular.module('myApp.aboutMe', ['ngRoute','angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/aboutMe', {
    templateUrl: 'aboutMe/aboutMe.html',
    controller: 'aboutMeCtrl'
  });
}])

.controller('aboutMeCtrl', ["$scope", function($scope) {
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    $scope.wnumber = userInfo.Wnumber;
    $scope.name = userInfo.name;
    $scope.pleader = userInfo.pleader;
    $scope.lwnumber = userInfo.lwnumber;
}]);