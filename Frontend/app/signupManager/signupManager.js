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

.controller('signupManagerCtrl', ["$scope","FileUploader", "$http", function($scope,FileUploader,$http){//创建控制
    //定义数组
    $scope.weeklys=[];
    $scope.done = false;
    $scope.show = "none";
    $scope.pagenumber = 1;
    $scope.start = 0;
    $scope.end = 0;
    $scope.sum = 0;
    $scope.pagemax = 6;
     var uploader= new FileUploader({
        url:"F:\\",
        autoUpload: true
      });
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
    //添加的方法
    $scope.add = function(){
        debugger;
        $scope.show = "block";
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
    //提交
    $scope.submit =function(){
        if(!validatePop()){
            return false;
        }
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        console.log($scope);
        //创建对象
        console.log($scope.sjob)
        // 读取当前用户缓存
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        var weekly = {"flag":false,"worker_id":userInfo.Wnumber,"job":$scope.job,"detail":$scope.detail,"done":$scope.done,"review":$scope.review};
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
        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/addWeekly",
            dataType: 'JSON',
            data:{"Wnumber":567,"Pname":11,"content":22,"completion":3,"review":2},
        }).
        success(function(data, status) {
        //$scope.status = status;
        console.log(data);
        }).
        error(function(data, status) {
          console.log(status);
          alert(data);
        });
    };
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
        $scope.weeklys.splice($index,1);
        // 更新总数
        $scope.sum = $scope.weeklys.length;
        if($scope.sum === 0){
            $scope.start = 0;
        }
        $scope.end = $scope.sum < $scope.pagemax*$scope.pagenumber ? $scope.sum:$scope.pagemax*$scope.pagenumber;
    };
    //改变每行chekbox的状态
    $scope.ck = function($index){
        $scope.weeklys[$index].flag=!$scope.weeklys[$index].flag;
    };
    //改变完成情况
    $scope.doneInit = function(){
        $scope.done = !$scope.done;
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

        // 选择改变侧边栏样式
    $scope.selectThis = function(selectedOne){
        console.log("hi");
        var selectedBG = "#373f52";
        var notSelectedBG = "#2a3245";
        // 点选的标签和当前标签一致时 直接返回 不改变样式
        if(selectedOne === $scope.selectOne){
            return;
        }
        // 恢复之前被选择的侧边栏标签
        var preOne = document.getElementById($scope.selectOne);
        preOne.style.backgroundColor = notSelectedBG;
        // 改变当前被选中的样式
        var thisOne = document.getElementById(selectedOne);
        thisOne.style.backgroundColor = selectedBG;
        $scope.selectOne = selectedOne;
    };

}]);