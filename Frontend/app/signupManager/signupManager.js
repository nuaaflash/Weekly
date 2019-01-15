'use strict';

angular.module('myApp.signupManager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signupManager', {
    templateUrl: 'signupManager/signupManager.html',
    controller: 'signupManagerCtrl'
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

.controller('signupManagerCtrl', ["$scope", "$http", function($scope,$http){
    $scope.done = false;
    $scope.show = "none";
    $scope.pagenumber = 1;
    $scope.start = 0;
    $scope.end = 0;
    $scope.sum = 0;
    $scope.pagemax = 6;
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    var lwnumber = userInfo.Wnumber;
    // 获取注册请求列表
    $http({
        method: "POST",
        url: "http://127.0.0.1:5000/getSignups",
        dataType: 'JSON',
        data:{'wnumber':lwnumber},
    }).
    success(function(data, status) {
       // alert(data[1].name);
        $scope.workers = [].concat(data);
        // 更新总数
        $scope.sum = $scope.workers.length;
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
    // 校验
    var validatePop=function () {
        var notFilled = [];
        if(!$scope.Wnumber || $scope.Wnumber === ""){
            notFilled.push("员工工号");
        }
        debugger;
        if(notFilled.length === 0){
            return true;
        }
        else{
            var errorInfo = "请输入";
            for(var i = 0;i < notFilled.length - 1;i ++){
                errorInfo = errorInfo + notFilled[i] + "、";
            }
            errorInfo = errorInfo + notFilled [notFilled.length - 1];
            alert(errorInfo);
            return false;
        }
    }
    //提交
    $scope.submit =function(){
        if(!validatePop()){
            return false;
        }
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');

        // 读取当前用户缓存
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        var lwnumber = userInfo.Wnumber;
        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/agreeSignup",
            dataType: 'JSON',
            data:{
                    "lwnumber":lwnumber,
                    "wnumber": $scope.Wnumber,
                    "userid": $scope.userid
                },
        }).
        success(function(data, status) {
            if(data){
                $scope.workers.splice($scope.thisline,1);
                alert('已同意！');
                // 同意后关闭弹窗
                $scope.close();
            }
            else if(status == 200){
                alert('工号已存在！');
                // 同意后关闭弹窗
            }
        }).
        error(function(data, status) {
            alert('操作失败');
            $scope.close(); 
        });

    };
    // 关闭弹窗
    $scope.close = function(){
        // 关闭窗口 清除数据
        $scope.name = "";
        $scope.userid = "";
        $scope.Wnumber = "";
        $scope.show = "none";
        $scope.thisline = -1;

    };
    // 拒绝注册
    $scope.deny = function($index){
        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/denySignup",
            dataType: 'JSON',
            data:{
                    "userid": $scope.workers[$index-1].userid
                },
        }).
        success(function(data, status) {
            $scope.workers.splice($index-1,1);
            alert('已拒绝！');
        }).
        error(function(data, status) {
            alert('操作失败');
        });
    };
    // 同意注册
    $scope.agree = function($index){
        debugger;
        $scope.show = "block";
        $scope.name = $scope.workers[$index-1].name;
        $scope.userid = $scope.workers[$index-1].userid;
        $scope.thisline = $index-1;

    };  
    
    //改变完成情况
    $scope.doneInit = function(){
        $scope.done = !$scope.done;
    };


}]);