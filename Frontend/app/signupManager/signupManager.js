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
    // 获取注册请求列表
    $http({
        method: "POST",
        url: "http://106.15.200.206:4396/getSignups",
        dataType: 'JSON',
        data:{},
    }).
    success(function(data, status) {
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
            url: "http://106.15.200.206:4396/agreeSignup",
            dataType: 'JSON',
            data:{
                    "lwnumber":lwnumber,
                    "wnumber": $scope.Wnumber,
                    "userid": $scope.userid
                },
        }).
        success(function(data, status) {
            $scope.works.splice($scope.thisline,1);
            alert('已同意！');
        }).
        error(function(data, status) {
            alert('操作失败');
        });
        // 同意后关闭弹窗
        $scope.close();
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
            url: "http://106.15.200.206:4396/denySignup",
            dataType: 'JSON',
            data:{
                    "userid": $scope.workers[$index].userid
                },
        }).
        success(function(data, status) {
            $scope.works.splice($index,1);
            alert('已拒绝！');
        }).
        error(function(data, status) {
            alert('操作失败');
        });
        // 同意后关闭弹窗
        $scope.close();
    };
    // 同意注册
    $scope.agree = function($index){
        debugger;
        $scope.show = "block";
        $scope.name = $scope.workers[$index].name;
        $scope.userid = $scope.workers[$index].userid;
        $scope.thisline = $index;
    };  
    //删除一行
    $scope.dele =function($index){
        $scope.works.splice($index,1);
        // 更新总数
        $scope.sum = $scope.works.length;
        if($scope.sum === 0){
            $scope.start = 0;
        }
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
    };
    //改变每行chekbox的状态
    $scope.ck = function($index){
        $scope.works[$index].flag=!$scope.works[$index].flag;
    };
    //改变完成情况
    $scope.doneInit = function(){
        $scope.done = !$scope.done;
    };

    //全选
    var qq = true;
    $scope.qx = function(){
        //获取属性
        var ck = $("input[name=ck]");
        for (var i=0;i<ck.length;i++) {
            ck[i].checked=qq;
            //给每个数组中的ck赋值
            $scope.works[i].flag=qq;
        }
        qq=!qq;
    };

}]);