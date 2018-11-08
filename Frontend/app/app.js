'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.weeklyManager',
  'myApp.myWeekly',
  'myApp.aboutMe',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // 设置路由定位前缀
  $locationProvider.hashPrefix('?');
  // 设置view路由默认值
  $routeProvider.otherwise({redirectTo: '/myWeekly'});
  // 两句语句作用的结果是 url#[前缀][路由默认值]
}]);
