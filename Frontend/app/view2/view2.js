'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ["$http", function($http) {
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