'use strict';

angular.module('myApp.addTask', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addTask', {
    templateUrl: 'addTask/addTask.html',
    controller: 'addTaskCtrl'
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

.controller('addTaskCtrl', ["$scope","FileUploader", "$http", function($scope,FileUploader,$http){//创建控制
    //定义数组
    $scope.users=[];
    $scope.done = false;
    $scope.show = "none";
    $scope.detailshow = "none";
    $scope.pagenumber = 1;
    $scope.start = 0;
    $scope.end = 0;
    $scope.sum = 0;
    $scope.pagemax = 6;
    $scope.taskcheck = 'notchecked';


    $scope.tasks=[];
    $scope.taskstart = 0;
    $scope.taskend = 0;
    $scope.tasksum = 0;
    $scope.wpagenumber = 1;
    // 初始化样式
    $scope.userlistshow = 'block';
    $scope.taskshow = 'none';
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
        url: "http://127.0.0.1:5000/getSubWorkers",
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
        $scope.taskshow = 'none';
    };

    //新增任务
    $scope.addTask = function($index){
        debugger;
        // 改变窗口样式
        $scope.editOrNot = {
        };
        $scope.readOnly = false;
        $scope.show = "block";
        $scope.showSave = "block";
        $scope.closeTag = "取消";
        $scope.operType = 'add';
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
            $scope.taskstart -= $scope.pagemax;
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
            $scope.taskstart += $scope.pagemax;
            $scope.wpagenumber += 1;
            $scope.taskend = $scope.tasksum < $scope.pagemax*$scope.wpagenumber ? $scope.tasksum:$scope.pagemax*$scope.wpagenumber;
        }
    };
    // 校验
    var validatePop=function () {
        var notFilled = [];
        if(!$scope.name || $scope.name === ""){
            notFilled.push("任务名称");
        }
        if(!$scope.content || $scope.content === ""){
            notFilled.push("任务内容");
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

    // 查看并分配任务
    $scope.seetask = function($index){
        $scope.userlistshow = 'none';
        $scope.taskshow = 'block';
        var Wnumber = $scope.users[$index].Wnumber;
        $scope.RW = Wnumber;
        // 调用服务查询该工号用户的任务
        $scope.tasks = [];
        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/getTask",
            dataType: 'JSON',
            data:{"Wnumber":Wnumber},
        }).
        success(function(data, status) {
            for(var i = 0;i < data.tasks.length;i ++){
                var sql_task = data.tasks[i];
                var task = {
                      "name":sql_task[1],
                      "content":sql_task[2],
                      "PWnumber":sql_task[3],
                      "RWnumber":sql_task[4],
                      "TID":sql_task[0]}
                $scope.tasks.push(task);
            }
            // 更新总数
            $scope.tasksum = $scope.tasks.length;
            if($scope.tasksum === 0){
                $scope.weeeklystart = 0;
            }
            $scope.taskend = $scope.tasksum < $scope.pagemax*$scope.wpagenumber ? $scope.tasksum:$scope.pagemax*$scope.wpagenumber;
        }).
        error(function(data, status) {
          alert("status");
        });
    }

     //提交
     $scope.submit =function(){
        /*if(!validatePop()){
            return false;
        }*/
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        debugger;
        if(1){
            $http({
                method: "POST",
                url: "http://127.0.0.1:5000/addTask",
                dataType: 'JSON',
                data:{"N":$scope.name,"P":lwnumber,"R":$scope.RW,"content":$scope.content},
            }).
            success(function(data, status) {
                var task = {
                    "name":$scope.name,
                    "content":$scope.content,
                    "PWnumber":lwnumber,
                    "RWnumber":$scope.RW}
                $scope.tasks.push(task);
                $scope.close();
            }).
            error(function(data, status) {
                alert('分配任务失败，请检查网络！');
                $scope.close();
            });
        }

    };

    // 关闭弹窗
    $scope.close = function(){
        if($scope.show === "block"){
            // 关闭窗口 清除数据
            $scope.name = "";
            $scope.content = "";
            $scope.show = "none";
        }
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

    //改变完成情况
    $scope.doneInit = function(){
        $scope.done = !$scope.done;
    };

}]);