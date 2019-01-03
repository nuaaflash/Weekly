'use strict';

angular.module('myApp.myWeekly', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myWeekly', {
    templateUrl: 'myWeekly/myWeekly.html',
    controller: 'myWeeklyCtrl'
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

.controller('myWeeklyCtrl', ["$scope", "$http", function($scope,$http){//创建控制
    // 定义数组
    $scope.weeklys=[];
    $scope.done = false;
    $scope.show = "none";
    $scope.pagenumber = 1;
    $scope.start = 0;
    $scope.end = 0;
    $scope.sum = 0;
    $scope.pagemax = 6;
    // 读取当前用户缓存
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    debugger;
    $http({
            method: "POST",
            url: "http://106.15.200.206:4396/getWeekly",
            dataType: 'JSON',
            data:{"Wnumber":userInfo.Wnumber},
        }).
        success(function(data, status) {
            for(var i = 0;i < data.weeklys.length;i ++){
                var sql_weekly = data.weeklys[i];
                var completion = (sql_weekly[5] === 1);
                var weekly = {"flag":false,"worker_id":sql_weekly[0],"job":sql_weekly[1],"detail":sql_weekly[4],"done":completion,"review":sql_weekly[7],"weeklyid":sql_weekly[8]};
                $scope.weeklys.push(weekly);
            }
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
        });

    // 编辑周报
    $scope.edit = function($index){
        $scope.index = $index;
        var thisWeekly = $scope.weeklys[$index];
        // 回填数据
        $scope.job = thisWeekly.job;
        $scope.detail = thisWeekly.detail;
        $scope.done = thisWeekly.done;
        $scope.review = thisWeekly.review;
        $scope.weeklyid = thisWeekly.weeklyid;
        $scope.show = "block";
        // 改变窗口样式
        $scope.editOrNot = {
        };
         $scope.readOnly = false;
         $scope.showSave = "block";
         $scope.closeTag = "取消";
         $scope.operType = 'edit'
    };

    // 查看周报
    $scope.details = function($index){
        var thisWeekly = $scope.weeklys[$index];
        // 回填数据
        $scope.job = thisWeekly.job;
        $scope.detail = thisWeekly.detail;
        $scope.done = thisWeekly.done;
        $scope.review = thisWeekly.review;
        $scope.show = "block";
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

    //添加的方法
    $scope.add = function(){
        debugger;
        // 改变窗口样式
        $scope.editOrNot = {
        };
        $scope.readOnly = false;
        $scope.show = "block";
        $scope.showSave = "block";
        $scope.closeTag = "取消";
        $scope.operType = 'add'
    };
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
        if(!$scope.job || $scope.job === ""){
            notFilled.push("工作名称");
        }
        if(!$scope.detail || $scope.detail === ""){
            notFilled.push("工作内容");
        }
        // if($scope.done === ""){
        //     notFilled.push("完成情况");
        // }
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
    };
    //提交
    $scope.submit =function(){
        if(!validatePop()){
            return false;
        }
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        console.log($scope);
        //创建对象
        console.log($scope.sjob);
        // 读取当前用户缓存
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        var weekly = {"flag":false,"worker_id":userInfo.Wnumber,"job":$scope.job,"detail":$scope.detail,"done":$scope.done,"review":$scope.review};
        if($scope.operType === 'add'){
            $http({
                method: "POST",
                url: "http://106.15.200.206:4396/addWeekly",
                dataType: 'JSON',
                data:{"Wnumber":userInfo.Wnumber,"Pname":$scope.job,"content":$scope.detail,"completion":$scope.done,"review":$scope.review},
            }).
            success(function(data, status) {
            //$scope.status = status;
            //alert(data);
            }).
            error(function(data, status) {
              console.log(status);
              alert(data);
            });
            //放进数组
            $scope.weeklys.push(weekly);
            // 关闭窗口 清除数据
            $scope.job = "";
            $scope.detail = "";
            $scope.done = false;
            $scope.review = "";
            $scope.show = "none";
            // 更新总数
            $scope.sum = $scope.weeklys.length;
            if($scope.sum === 0){
                $scope.start = 0;
            }
            $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
            // 新建后的记录不在本页则翻页
            if($scope.sum > $scope.end){
                $scope.nextpage();
            }
        }
        else if($scope.operType === 'edit'){
            $http({
                method: "POST",
                url: "http://106.15.200.206:4396/editWeekly",
                dataType: 'JSON',
                data:{"Pname":$scope.job,"content":$scope.detail,"completion":$scope.done,"review":$scope.review,"weeklyid":$scope.weeklyid},
            }).
            success(function(data, status) {
                alert('修改成功！')
            }).
            error(function(data, status) {
              console.log('修改失败，请检查网络！');
            });
            // 替换进数组
            $scope.weeklys.splice($scope.index,1,weekly);
            $scope.close();
        }

    };
    // 关闭弹窗
    $scope.close = function(){
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

    };
    //删除一行
    $scope.dele =function($index){
        // 从数据库删除
        var thisWeekly = $scope.weeklys[$index];
        $scope.weeklyid = thisWeekly.weeklyid;
        $http({
            method: "POST",
            url: "http://106.15.200.206:4396/deleteWeekly",
            dataType: 'JSON',
            data:{"weeklyid":$scope.weeklyid},
        }).
        success(function(data, status) {
            alert('删除成功！')
        }).
        error(function(data, status) {
          console.log('删除失败，请检查网络！');
        });
        // 从数组删除
        $scope.weeklys.splice($index,1);
        // 更新总数
        $scope.sum = $scope.weeklys.length;
        if($scope.sum === 0){
            $scope.start = 0;
        }
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
    };
    //改变完成情况
    $scope.doneInit = function(code){
        $scope.done = (code === 1);
    };
    //改变完成情况
    $scope.donef = function($index){
        $scope.weeklys[$index].done=!$scope.weeklys[$index].done;
    };
    //批量删除
    $scope.plsc = function(){
        //反着遍历
        for (var i = $scope.weeklys.length-1;i>=0;i--) {
            if ($scope.weeklys[i].flag) {
                $scope.weeklys.splice(i,1);
            }
        }
    };

    //全选
    var qq = true;
    $scope.qx = function(){
        //获取属性
        var ck = $("input[name=ck]");
        for (var i=0;i<ck.length;i++) {
            ck[i].checked=qq;
            //给每个数组中的ck赋值
            $scope.weeklys[i].flag=qq;
        }
        qq=!qq;
    };

}]);