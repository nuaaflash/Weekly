'use strict';

angular.module('myApp.weeklyManager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weeklyManager', {
    templateUrl: 'weeklyManager/weeklyManager.html',
    controller: 'weeklyManagerCtrl'
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

.controller('weeklyManagerCtrl', ["$scope","FileUploader", "$http", function($scope,FileUploader,$http){//创建控制
    //定义数组
    $scope.users=[];
    $scope.done = false;
    $scope.show = "none";
    $scope.pagenumber = 1;
    $scope.start = 0;
    $scope.end = 0;
    $scope.sum = 0;
    $scope.pagemax = 6;

    
    $scope.weeklys=[];
    $scope.weeklystart = 0;
    $scope.weeklyend = 0;
    $scope.weeklysum = 0;
    $scope.wpagenumber = 1;
    // 初始化样式
    $scope.userlistshow = 'block';
    $scope.weeklyshow = 'none';
     var uploader= new FileUploader({
        url:"F:\\",
        autoUpload: true
      });
    // 读取当前用户缓存
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    var lwnumber = userInfo.Wnumber;
    // 初始化users
    $http({
        method: "POST",
        url: "http://106.15.200.206:4396/getSubWorkers",
        dataType: 'JSON',
        data:{"lwnumber":lwnumber},
    }).
    success(function(data, status) {
        $scope.users = [].concat(data);
        // 更新总数
        $scope.sum = $scope.users.length;
        if($scope.sum === 0){
            $scope.start = 0;
        }
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
    }).
    error(function(data, status) {
      console.log('请检查网络！');
    });

    //返回到用户列表
    $scope.back = function(){
        debugger;
        $scope.userlistshow = 'block';
        $scope.weeklyshow = 'none';
    };
    // 上一页
    $scope.lastpage = function(usermode = true){
        if(usermode){
            debugger;
            $scope.start -= $scope.pagemax;
            $scope.pagenumber -= 1;
        }
        else{
            debugger;
            $scope.weeklystart -= $scope.pagemax;
            $scope.wpagenumber -= 1;
        }
    };
    // 下一页
    $scope.nextpage = function(usermode = true){
        debugger;
        if(usermode){
            $scope.start += $scope.pagemax;
            $scope.pagenumber += 1;
            $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
        }
        else{
            $scope.weeklystart += $scope.pagemax;
            $scope.wpagenumber += 1;
            $scope.weeklyend = $scope.weeklysum < $scope.pagemax*$scope.wpagenumber ? $scope.weeklysum:$scope.pagemax*$scope.wpagenumber;
        }
    };
    // 校验
    var validatePop=function () {
        var notFilled = [];
        if(!$scope.job || $scope.job === ""){
            notFilled.push("工作名称");
        }
        if(!$scope.detail || $scope.detail === ""){
            notFilled.push("工作内容");
        }
        if(!$scope.review || $scope.review === ""){
            notFilled.push("总结反思");
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

    // 查看周报
    $scope.seeweekly = function($index){
        $scope.userlistshow = 'none';
        $scope.weeklyshow = 'block';
        var Wnumber = $scope.users[$index].Wnumber;
        // 调用服务查询该工号用户的周报
        $http({
            method: "POST",
            url: "http://106.15.200.206:4396/getWeekly",
            dataType: 'JSON',
            data:{"Wnumber":Wnumber},
        }).
        success(function(data, status) {
            $scope.weeklys = []
            for(var i = 0;i < data.weeklys.length;i ++){
                var sql_weekly = data.weeklys[i];
                var completion = (sql_weekly[5] === 1);
                var weekly = {"flag":false,"Wnumber":sql_weekly[0],"job":sql_weekly[1],"detail":sql_weekly[4],"done":completion,"review":sql_weekly[7]};
                $scope.weeklys.push(weekly);
            }
            // 更新总数
            $scope.sum = $scope.weeklys.length;
            if($scope.sum === 0){
                $scope.start = 0;
            }
            $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
        }).
        error(function(data, status) {
          console.log(status);
        });
        debugger;
        // 更新总数
        $scope.weeklysum = $scope.weeklys.length;
        if($scope.weeklysum === 0){
            $scope.weeeklystart = 0;
        }
        $scope.weeklyend = $scope.weeklysum < $scope.pagemax*$scope.wpagenumber ? $scope.weeklysum:$scope.pagemax*$scope.wpagenumber;

    }
    
    // 查看周报
    $scope.comments = function($index){
        console.log($index);
        // 调用服务查询该工号用户的周报
        // $http({
        //     method: "POST",
        //     url: "http://106.15.200.206:4396/getWeekly",
        //     dataType: 'JSON',
        //     data:{},
        // }).
        // success(function(data, status) {
        //     $scope.weeklys = []
        //     for(var i = 0;i < data.weeklys.length;i ++){
        //         var sql_weekly = data.weeklys[i];
        //         var completion = (sql_weekly[5] === 1);
        //         var weekly = {"flag":false,"Wnumber":sql_weekly[0],"job":sql_weekly[1],"detail":sql_weekly[4],"done":completion,"review":sql_weekly[7]};
        //         $scope.weeklys.push(weekly);
        //     }
        //     // 更新总数
        //     $scope.sum = $scope.weeklys.length;
        //     if($scope.sum === 0){
        //         $scope.start = 0;
        //     }
        //     $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
        // }).
        // error(function(data, status) {
        //     console.log(status);
        // });
    }

    // 关闭弹窗
    $scope.close = function(){
        // 关闭窗口 清除数据
        $scope.job = "";
        $scope.detail = "";
        $scope.done = false;
        $scope.review = "";
        $scope.show = "none";
    };
    //删除一行
    $scope.dele =function($index){
        $scope.users.splice($index,1);
        // 更新总数
        $scope.sum = $scope.users.length;
        if($scope.sum === 0){
            $scope.start = 0;
        }
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
    };
    //改变每行chekbox的状态
    $scope.ck = function($index){
        $scope.users[$index].flag=!$scope.users[$index].flag;
    };
    //改变完成情况
    $scope.doneInit = function(){
        $scope.done = !$scope.done;
    };

}]);