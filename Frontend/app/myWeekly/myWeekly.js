'use strict';

angular.module('myApp.myWeekly', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myWeekly', {
    templateUrl: 'myWeekly/myWeekly.html',
    controller: 'myWeeklyCtrl'
  });
}])

.controller('myWeeklyCtrl', ["$http", function($http) {
    $http({
        method: "GET",
        url: "http://127.0.0.1:5000/todos",
        dataType: 'JSON',
        data:{
          }
      }).
      success(function(data, status) {
       //$scope.status = status;
        console.log(data);
      }).
      error(function(data, status) {
          console.log(data);
       //$scope.data = data || "Request failed";
       //$scope.status = status;
     });
}]);