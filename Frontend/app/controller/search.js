'use strict';

angular.module('myApp.search', [])

.controller('searchCtrl',  ["$http", "$scope",function($http, $scope) {
    $scope.searchfont = 'searchtips';
    // 搜索
    $scope.search = function(){
        debugger;
        alert($scope.keyword);
        // $http({
        //     method: "POST",
        //     url: "http://127.0.0.1:5000/search",
        //     dataType: 'JSON',
        //     data:{"keyword":$scope.keyword},
        //   }).
        //   success(function(data, status) {
        //    //$scope.status = status;
        //     console.log(data);
        //  }).
        //   error(function(data, status) {
        //       console.log(data);
        //       alert("网络错误！");
        //  });
        
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