'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$http", function($http) {
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