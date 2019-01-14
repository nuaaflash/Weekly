'use strict';

angular.module('myApp.searchCenter', ['ngRoute','angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/searchCenter', {
    templateUrl: 'searchCenter/searchCenter.html',
    controller: 'searchCenterCtrl'
  });
}])

.controller('searchCenterCtrl', ["$http", "$scope",function($http, $scope) {
  var searchResult = sessionStorage.getItem('searchResult');
  if(searchResult != null){
    searchResult = JSON.parse(searchResult);
    $scope.users = searchResult.users;
    $scope.searchfont = 'searchtips';
    $scope.usershow = "block";
    $scope.searchshow = "none";
    console.log(searchResult);
    // $scope.wnumber = searchResult.Wnumber;
    // $scope.name = searchResult.name;
    // $scope.pleader = searchResult.pleader;
    // $scope.lwnumber = searchResult.lwnumber;
    sessionStorage.removeItem('searchResult')
  }
  else{
    $scope.searchfont = 'searchtips';
    $scope.usershow = "none";
    $scope.searchshow = "block";
  }
  // 搜索
  $scope.search = function(inpage){
    if(inpage == 1){
      $http({
          method: "POST",
          url: "http://127.0.0.1:5000/search",
          dataType: 'JSON',
          data:{"keyword":$scope.keyword},
        }).
        success(function(data, status) {
         //$scope.status = status;
         
         $scope.usershow = "block";
         $scope.searchshow = "none";
         var userInfo = data;
         $scope.wnumber = userInfo.Wnumber;
         $scope.name = userInfo.name;
         $scope.pleader = userInfo.pleader;
         $scope.lwnumber = userInfo.lwnumber;
         alert('搜索成功！')

       }).
        error(function(data, status) {
            console.log(data);
            alert("网络错误！");
       });
    }
    else{
      debugger;
      $http({
        method: "POST",
        url: "http://127.0.0.1:5000/search",
        dataType: 'JSON',
        data:{"keyword":$scope.keyword},
      }).
      success(function(data, status) {
       //$scope.status = status;
       sessionStorage.setItem('searchResult',JSON.stringify(data));
       var searchCenterHref = document.getElementById("searchCenter");
       searchCenterHref.click();
       alert('搜索成功！');
     }).
      error(function(data, status) {
          console.log(data);
          alert("网络错误！");
     });
    }
  }

  document.onkeydown = keyDown;
  //回车
  function keyDown(e) {	
      var e =e||event;	
      var key=e.keyCode||e.which||e.charCode; 	
      if(key==0xD){ 
          // 判断是否按下回车键
          // 按下回车搜索
          $scope.search();
      }
  } 


}]);