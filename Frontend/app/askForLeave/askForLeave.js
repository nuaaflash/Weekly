'use strict';

angular.module('myApp.askForLeave', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/askForLeave', {
    templateUrl: 'askForLeave/askForLeave.html',
    controller: 'askForLeaveCtrl'
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

.controller('askForLeaveCtrl', ["$scope", "$http", function($scope,$http){//创建控制
    // 定义数组
    $scope.askings=[];
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
            url: "http://127.0.0.1:5000/searchAsking",
            dataType: 'JSON',
            data:{"Wnumber":userInfo.Wnumber},
        }).
        success(function(data, status) {
            $scope.askings = data;
            $scope.chooseTime(data.partOfDay)
            // 更新总数
            $scope.sum = $scope.askings.length;
            if($scope.sum === 0){
                $scope.start = 0;
            }
            $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
        }).
        error(function(data, status) {
          console.log(status);
        });

    // 编辑周报
    $scope.edit = function($index){
        $scope.index = $index;
        var thisasking = $scope.askings[$index];
        // 回填数据
        $scope.job = thisasking.job;
        $scope.detail = thisasking.detail;
        $scope.done = thisasking.done;
        $scope.review = thisasking.review;
        $scope.askingid = thisasking.askingid;
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
        var thisasking = $scope.askings[$index];
        // 回填数据
        $scope.job = thisasking.job;
        $scope.detail = thisasking.detail;
        $scope.done = thisasking.done;
        $scope.review = thisasking.review;
        $scope.comment = thisasking.comment?thisasking.comment:'暂无评价';
        $scope.show = "block";
        $scope.operType = 'view'
        // 改变窗口样式
        $scope.editOrNot = {
            "outline":"none",
            "border-style":"none"
        };
         $scope.readOnly = true;

         $scope.showSave = "none";
         $scope.closeTag = "关闭";

         $scope.finishStatus = thisasking.done? '已完成':'完成中';
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
        $scope.operType = 'add';
        var time = new Date();        
        var day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();        
        var month = time.getMonth() + 1;      
        month = month < 10 ? '0' + month : month;
        var today = time.getFullYear() + "-" + (month) + "-" + (day);       
        $scope.askingdate = today;
        $scope.chooseTime(1);
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
        if(!$scope.reason || $scope.reason === ""){
            notFilled.push("请假原因");
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

    $scope.back = function(){
        $scope.askingshow = "none";
        $scope.taskshow = "block";
    };
    //提交

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

    $scope.showAsking = function($index){
        $scope.askingshow = "block";
        $scope.taskshow = "none";
        $scope.askings = [];    
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        var TID = $scope.tasks[$index].TID;
        $scope.addaskingTID = TID;
        debugger;
        $http({
                method: "POST",
                url: "http://127.0.0.1:5000/getasking",
                dataType: 'JSON',
                data:{"Wnumber":userInfo.Wnumber,"TID":TID},
            }).
            success(function(data, status) {
                for(var i = 0;i < data.askings.length;i ++){
                    var sql_asking = data.askings[i];
                    var completion = (sql_asking[5] === 1);
                    var asking = {
                        "flag":false,
                        "Wnumber":userInfo.Wnumber,
                        "job":sql_asking[1],
                        "detail":sql_asking[4],
                        "done":completion,
                        "audit":sql_asking[6],
                        "review":sql_asking[7],
                        "askingid":sql_asking[8],
                        "comment":sql_asking[9],
                        "TID":sql_asking[10]
                    };
                    $scope.askings.push(asking);
                }
                debugger;
                // 更新总数
                $scope.sum = $scope.askings.length;
                if($scope.sum === 0){
                    $scope.start = 0;
                }
                $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
            }).
            error(function(data, status) {
              console.log(status);
              debugger;
            });
    };

    $scope.submit =function(){
        if(!validatePop()){
            return false;
        }
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        // 转换选择的时间
        var date = new Date($scope.askingdate);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();        
        var month = date.getMonth() + 1;      
        month = month < 10 ? '0' + month : month;
        var dates = date.getFullYear() + "-" + (month) + "-" + (day);
        // 转换选择的时段
        var partOfDay = 3;
        if($scope.morning){
            partOfDay = 1;
        }
        else if($scope.afternoon){
            partOfDay = 2;
        }
        else if($scope.wholeday){
            partOfDay = 3;
        }
        // 读取当前用户缓存
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if($scope.operType === 'add'){
            $http({
                method: "POST",
                url: "http://127.0.0.1:5000/addasking",
                dataType: 'JSON',
                data:{
                    "Wnumber":userInfo.Wnumber,
                    "Date":dates,
                    "PartOfDay":partOfDay,
                }
            }).
            success(function(data, status) {
                alert("添加成功！");
            }).
            error(function(data, status) {
              console.log(status);
              alert('网络错误！');
            });
            //放进数组
            $scope.askings.push(asking);
            // 关闭窗口 清除数据
            $scope.job = "";
            $scope.detail = "";
            $scope.done = false;
            $scope.review = "";
            $scope.show = "none";
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
        }
        else if($scope.operType === 'edit'){
            $http({
                method: "POST",
                url: "http://127.0.0.1:5000/editasking",
                dataType: 'JSON',
                data:{"Pname":$scope.job,"content":$scope.detail,"completion":$scope.done,"review":$scope.review,"askingid":$scope.askingid},
            }).
            success(function(data, status) {
                alert('修改成功！')
            }).
            error(function(data, status) {
              console.log('修改失败，请检查网络！');
            });
            // 替换进数组
            $scope.askings.splice($scope.index,1,asking);
            $scope.close();
        }

    };

    //删除一行
    $scope.dele =function($index){
        // 从数据库删除
        var thisasking = $scope.askings[$index];
        $scope.askingid = thisasking.askingid;
        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/deleteWeekly",
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
        $scope.askings.splice($index,1);
        // 更新总数
        $scope.sum = $scope.askings.length;
        if($scope.sum === 0){
            $scope.start = 0;
        }
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
    };

    $scope.chooseTime = function(partOfDay){
        $scope.morning = (partOfDay == 1);
        $scope.afternoon = (partOfDay == 2);
        $scope.wholeday = (partOfDay == 3);
    }

}]);