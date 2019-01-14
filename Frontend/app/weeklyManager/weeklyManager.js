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
    $scope.detailshow = "none";
    $scope.pagenumber = 1;
    $scope.start = 0;
    $scope.end = 0;
    $scope.sum = 0;
    $scope.pagemax = 6;
    $scope.weeklycheck = 'notchecked';

    // weekly表格相关变量
    $scope.weeklys=[];
    $scope.weeklystart = 0;
    $scope.weeklyend = 0;
    $scope.weeklysum = 0;
    $scope.wpagenumber = 1;
    // task表格相关变量
    $scope.tasks=[];
    $scope.taskstart = 0;
    $scope.taskend = 0;
    $scope.tasksum = 0;
    $scope.tpagenumber = 1;
    // 初始化样式
    $scope.userlistshow = 'block';
    $scope.weeklyshow = 'none';
    $scope.taskshow = 'none';

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
        if($scope.weeklyshow == "block"){
            $scope.taskshow = 'block';
            $scope.weeklyshow = 'none';
        }
        else{
            $scope.userlistshow = 'block';
            $scope.taskshow = 'none';
        }

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
        if(!$scope.comment || $scope.comment === ""){
            notFilled.push("评论");
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

    // 查看任务
    $scope.seetask = function($index){
        $scope.userlistshow = 'none';
        $scope.taskshow = 'block';
        $scope.weeklyshow = 'none';
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        var lwnumber = userInfo.Wnumber;
        var Wnumber = $scope.users[$index].Wnumber;
        // 调用服务查询该工号用户的周报
        $scope.tasks = [];
        $http({
                method: "POST",
                url: "http://127.0.0.1:5000/getTask",
                dataType: 'JSON',
                data:{"Wnumber":Wnumber},
            }).
            success(function(data, status) {
                console.log(data);
                for(var i = 0;i < data.tasks.length;i ++){
                    var sql_task = data.tasks[i];
                    var completion = (sql_task[5] === 1);
                    var task = {
                        "name":sql_task[1],
                        "detail":sql_task[2],
                        "Wnumber":sql_task[4],
                        "TaskID":sql_task[0],
                        "done":0
                    };
                    $scope.tasks.push(task);
                }
                debugger;
                 // 更新总数
                $scope.tasksum = $scope.tasks.length;
                if($scope.tasksum === 0){
                    $scope.taskstart = 0;
                }
                $scope.taskend = $scope.tasksum < $scope.pagemax*$scope.tpagenumber ? $scope.tasksum:$scope.pagemax*$scope.tpagenumber;
            }).
            error(function(data, status) {
              console.log(status);
              debugger;
              alert("1asd56a");
            });
        debugger;
       
    }

    // 查看周报
    $scope.seeweekly = function($index){
        $scope.userlistshow = 'none';
        $scope.taskshow = 'none';
        $scope.weeklyshow = 'block';
        var Wnumber = $scope.tasks[$index].Wnumber;
        var TaskID = $scope.tasks[$index].TaskID;
        // 调用服务查询该工号用户的周报
        $scope.weeklys = [];
        $http({
                method: "POST",
                url: "http://127.0.0.1:5000/getWeekly",
                dataType: 'JSON',
                data:{
                    "Wnumber":Wnumber,
                    "TID":TaskID
                },
            }).
            success(function(data, status) {
                for(var i = 0;i < data.weeklys.length;i ++){
                    var sql_weekly = data.weeklys[i];
                    var completion = (sql_weekly[5] === 1);
                    var weekly = {
                        "flag":false,
                        "Wnumber":userInfo.Wnumber,
                        "job":sql_weekly[1],
                        "detail":sql_weekly[4],
                        "done":completion,
                        "audit":sql_weekly[6],
                        "review":sql_weekly[7],
                        "weeklyid":sql_weekly[8],
                        "comment":sql_weekly[9],
                        "TaskID":sql_weekly[10]
                    };
                    $scope.weeklys.push(weekly);
                }
                debugger;
                // 更新总数
                $scope.sum = $scope.weeklys.length;
                if($scope.sum === 0){
                    $scope.start = 0;
                }
                $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
                // // 新建后的记录不在本页则翻页
                // if($scope.sum > $scope.end){
                //     $scope.nextpage();
                // }
            }).
            error(function(data, status) {
              console.log(status);
              debugger;
              alert("1asd56a");
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
        $scope.index = $index;
        var thisWeekly = $scope.weeklys[$index];
        // 回填数据
        $scope.job = thisWeekly.job;
        $scope.weeklyid = thisWeekly.weeklyid;
        $scope.comment = thisWeekly.comment;
        debugger;
        // 改变窗口样式
        $scope.editOrNot = {
        };
        $scope.readOnly = false;
        $scope.show = "block";
        $scope.showSave = "block";
        $scope.closeTag = "取消";
        $scope.operType = 'comments'
    }

     //提交
     $scope.submit =function(){
        if(!validatePop()){
            return false;
        }
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        
        if($scope.operType === 'comments'){
            $http({
                method: "POST",
                url: "http://127.0.0.1:5000/commentWeekly",
                dataType: 'JSON',
                data:{"comment":$scope.comment,"weeklyid":$scope.weeklyid},
            }).
            success(function(data, status) {
                alert('已评论！')
                $scope.weeklys[$scope.index].comment = $scope.comment;
                $scope.weeklys[$scope.index].audit = 1;
                $scope.close();
            }).
            error(function(data, status) {
                alert('评论失败，请检查网络！');
                $scope.close();
            });
            // 替换进数组
            // $scope.weeklys.splice($scope.index,1,weekly); 
        }

    };

    // 查看周报
    $scope.details = function($index){
        var thisWeekly = $scope.weeklys[$index];
        // 回填数据
        $scope.job = thisWeekly.job;
        $scope.detail = thisWeekly.detail;
        $scope.done = thisWeekly.done;
        $scope.review = thisWeekly.review;
        $scope.detailshow = "block";
        // 改变窗口样式
        $scope.editOrNot = {
            "outline":"none",
            "border-style":"none"
        };
         $scope.readOnly = true;

         $scope.showSave = "none";
         $scope.closeTag = "关闭";

         $scope.finishStatus = thisWeekly.done? '已完成':'完成中';
    };

    // 关闭弹窗
    $scope.close = function(){
        if($scope.show === "block"){
            // 关闭窗口 清除数据
            $scope.comment = "";
            $scope.show = "none";
        }
        else if($scope.detailshow === "block"){
            $scope.detailshow = "none";
            // 关闭窗口 清除数据
            $scope.job = "";
            $scope.detail = "";
            $scope.done = false;
            $scope.review = "";
            $scope.show = "none";
            // 改变窗口样式
            $scope.editOrNot = {
            };
            $scope.readOnly = false;
            $scope.index = -1;
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