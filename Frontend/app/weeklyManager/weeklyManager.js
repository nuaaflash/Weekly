'use strict';

angular.module('myApp.weeklyManager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weeklyManager', {
    templateUrl: 'weeklyManager/weeklyManager.html',
    controller: 'weeklyManagerCtrl'
  });
}])

.controller('weeklyManagerCtrl', ["$http", function($http) {
    $http({
        method: "POST",
        url: "http://127.0.0.1:5000/todos",
        dataType: 'JSON',
        data:{"task":"todo1"}
      }).
      success(function(data, status) {
       //$scope.status = status;
        console.log(data);
      }).
      error(function(data, status) {
       //$scope.data = data || "Request failed";
       //$scope.status = status;
     });
}]);