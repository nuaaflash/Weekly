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
    $scope.askingtitle = '请假申请';
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
        $scope.askingtitle = '修改申请';
        $scope.index = $index;
        var thisasking = $scope.askings[$index];
        // 回填数据
        $scope.askingdate = thisasking.date;
        $scope.reason = thisasking.reason;
        $scope.chooseTime(thisasking.partOfDayNum);
        $scope.partOfDayLabel = this.partOfDay;
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
        $scope.index = $index;
        var thisasking = $scope.askings[$index];
        // 回填数据
        $scope.askingdate = thisasking.date;
        $scope.reason = thisasking.reason;
        $scope.chooseTime(thisasking.partOfDayNum);
        $scope.partOfDayLabel = thisasking.partOfDay;
        $scope.askingid = thisasking.askingid;
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
        $scope.askingtitle = '请假申请'
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
        var today = new Date(); 
        var date = new Date($scope.askingdate);
        if(notFilled.length === 0){
            if(date <= today){
                errorInfo = "不能选择今天及以前的日期";
                alert(errorInfo);
                return false;
            }
            else{
                return true;
            }
        }
        else{
            var errorInfo = "请输入";
            for(var i = 0;i < notFilled.length - 1;i ++){
                errorInfo = errorInfo + notFilled[i] + "、";
            }
            errorInfo = errorInfo + notFilled [notFilled.length - 1];

            if(date <= today){
                errorInfo  = errorInfo +  "\n\n不能选择今天及以前的日期";
            }
            alert(errorInfo);
            return false;
        }
    };

    

    // 关闭弹窗
    $scope.close = function(){
        // 关闭窗口 清除数据
        $scope.reason = "";
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

    //提交
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
                    "Reason":$scope.reason,
                }
            }).
            success(function(data, status) {
                if(data){
                    alert("添加成功！");
                    
                    $scope.askings = data;
                    $scope.chooseTime(data.partOfDay)
                    // 更新总数
                    $scope.sum = $scope.askings.length;
                    if($scope.sum === 0){
                        $scope.start = 0;
                    }
                    $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
        
                    $scope.close();
                }
                else{
                    alert('该日期和时段已有请假！');
                    $scope.close();
                }
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
                data:{
                    "Wnumber":userInfo.Wnumber,
                    "Date":dates,
                    "PartOfDay":partOfDay,
                    "Reason":$scope.reason,
                    "askingid":$scope.askingid,
                }
            }).
            success(function(data, status) {
                if(data){
                    alert('修改成功！');
                    $scope.askings = data;
                        $scope.chooseTime(data.partOfDay)
                        // 更新总数
                        $scope.sum = $scope.askings.length;
                        if($scope.sum === 0){
                            $scope.start = 0;
                        }
                        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
                        $scope.close();
                }
                else{
                    alert('该日期已有请假！');
                    $scope.close();
                }
            }).
            error(function(data, status) {
              console.log('修改失败，请检查网络！');
            });
        }

    };

    //删除一行
    $scope.dele =function($index){
        // 从数据库删除
        var thisasking = $scope.askings[$index];
        $scope.askingid = thisasking.askingid;
        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/deleteasking",
            dataType: 'JSON',
            data:{"askingid":$scope.askingid,'Wnumber':thisasking.wnumber},
        }).
        success(function(data, status) {
            alert('删除成功！');
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
          console.log('删除失败，请检查网络！');
        });
    };

    $scope.chooseTime = function(partOfDay){
        $scope.morning = (partOfDay == 1);
        $scope.afternoon = (partOfDay == 2);
        $scope.wholeday = (partOfDay == 3);
    }

}]);