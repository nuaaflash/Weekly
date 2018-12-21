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
    $scope.weeklys=[];
    $scope.done = false;
    $scope.show = "none";
    $scope.pagenumber = 1;
    $scope.start = 0;
    $scope.end = 0;
    $scope.sum = 0;
    $scope.pagemax = 6;
    // 初始化样式
    $scope.userlistshow = 'block';
    $scope.weeklyshow = 'none';
     var uploader= new FileUploader({
        url:"F:\\",
        autoUpload: true
      });
    // 初始化users(TODO:用restful服务代替)
    var user = {};
    user.Wnumber = '161530319';
    user.name = '夏涵';
    $scope.users.push(user);
    // 上传文件方法
    uploader.filters.push({
        name: "xxx.doc",
        fn: function(item) {
            //item就是你上传的文件 这里面你就可以写你需要筛选的条件，下面举一个例子，筛选文件的大小
            //$scope.maxSize是我指令传过来的参数
            var fileSizeValid = item.size > 0; //文件大小限制；
            return fileSizeValid ;
        }
    })
    $scope.UploadFile = function(){
        uploader.uploadAll();
    }
    //返回到用户列表
    $scope.back = function(){
        debugger;
        $scope.userlistshow = 'block';
        $scope.weeklyshow = 'none';
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
    }

    // 查看周报
    $scope.seeweekly = function(){
        $scope.userlistshow = 'none';
        $scope.weeklyshow = 'block';
        var Wnumber = $scope.users[$index].Wnumber;
        // TODO:调用服务查询该工号用户的周报
        var weekly = {};
        weekly.Wnumber = Wnumber;
        weekly.job = '跳舞';
        weekly.detail = '乱跳';
        weekly.review = '跳得好';
        $scope.weeklys.push(weekly);
        // 更新总数
        $scope.sum = $scope.users.length;
        if($scope.sum === 0){
            $scope.start = 0;
        }
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;

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