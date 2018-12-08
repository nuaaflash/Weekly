'use strict';

angular.module('myApp.myWeekly', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myWeekly', {
    templateUrl: 'myWeekly/myWeekly.html',
    controller: 'myWeeklyCtrl'
  });
}])

.controller('myWeeklyCtrl', ["$scope","FileUploader", "$http", function($scope,FileUploader,$http){//创建控制

    //定义数组
    $scope.workers=[];
    $scope.done = false;
    $scope.show = "none";
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
    //提交
    $scope.submit =function(){
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        console.log($scope);
        //创建对象
        console.log($scope.sjob)
        var worker = {"flag":false,"worker_id":$scope.worker_id,"job":$scope.sjob,"detail":$scope.detail,"done":$scope.done,"review":$scope.review};
        //放进数组
        $scope.workers.push(worker);
        pop.style.display = "none";
        back_of_pop.style.display = "none";
    };
    // 关闭弹窗
    $scope.close = function(){
        $scope.show = "none";
    };
    //删除一行
    $scope.dele =function($index){
        $scope.workers.splice($index,1);
    };
    //改变每行chekbox的状态
    $scope.ck = function($index){
        $scope.workers[$index].flag=!$scope.workers[$index].flag;
    };
    //改变完成情况
    $scope.doneInit = function(){
        $scope.done = !$scope.done;
    };
    //改变完成情况
    $scope.donef = function($index){
        $scope.workers[$index].done=!$scope.workers[$index].done;
    };
    //批量删除
    $scope.plsc = function(){
        //反着遍历
        for (var i = $scope.workers.length-1;i>=0;i--) {
            if ($scope.workers[i].flag) {
                $scope.workers.splice(i,1);
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
            $scope.workers[i].flag=qq;
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