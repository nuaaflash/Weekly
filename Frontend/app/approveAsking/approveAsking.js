'use strict';

angular.module('myApp.approveAsking', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/approveAsking', {
    templateUrl: 'approveAsking/approveAsking.html',
    controller: 'approveAskingCtrl'
  });
}])

.filter('startFrom', function() {
    return function(input, start) {

        if(input) {
            start = +start; //parse to int
            console.log(start);
            if(start !== 0){
                return input.slice(start);
            }
            return input;
        }

        return [];

    }

})

.controller('approveAskingCtrl', ["$scope","FileUploader", "$http", function($scope,FileUploader,$http){//创建控制
    $scope.done = false;
    $scope.show = "none";
    $scope.pagenumber = 1;
    $scope.start = 0;
    $scope.end = 0;
    $scope.sum = 0;
    $scope.pagemax = 6;
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    var wnumber = userInfo.Wnumber;
    // 获取注册请求列表
    $http({
        method: "POST",
        url: "http://127.0.0.1:5000/getsubaskings",
        dataType: 'JSON',
        data:{'Wnumber':wnumber},
    }).
    success(function(data, status) {
       // alert(data[1].name);
        $scope.askings = [].concat(data);
        // 更新总数
        $scope.sum = $scope.askings.length;
        if($scope.sum === 0){
            $scope.start = 0;
        }
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
        // 新建后的记录不在本页则翻页
        if($scope.sum > $scope.end){
            $scope.nextpage();
        }
    }).
    error(function(data, status) {
        alert('请检查网络！');
    });

    // 上一页
    $scope.lastpage = function(){
        debugger;
        $scope.start -= $scope.pagemax;
        $scope.pagenumber -= 1;
    };
    // 下一页
    $scope.nextpage = function(){
        debugger;
        $scope.start += $scope.pagemax;
        $scope.pagenumber += 1;
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
    };
    
    // 拒绝请假
    $scope.deny = function($index){
        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/denyAsking",
            dataType: 'JSON',
            data:{
                    "askingid": $scope.askings[$index-1].askingid
                },
        }).
        success(function(data, status) {
            // 替换更新后的数据
            $scope.askings[$index-1].agree = -1;
            alert('已拒绝！');
        }).
        error(function(data, status) {
            alert('操作失败');
        });
    };
    // 同意请假
    $scope.agree = function($index){
        debugger;
        $scope.name = $scope.askings[$index-1].name;
        //alert($scope.askings[$index].name);
        $scope.askingid = $scope.askings[$index-1].askingid;
        $scope.thisline = $index-1;        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/agreeAsking",
            dataType: 'JSON',
            data:{
                    "askingid": $scope.askings[$index-1].askingid
                },
        }).
        success(function(data, status) {
            // 替换更新后的数据
            $scope.askings[$index-1].agree = -1;
            alert('已通过！');
        }).
        error(function(data, status) {
            alert('操作失败');
        });

    };  

}]);