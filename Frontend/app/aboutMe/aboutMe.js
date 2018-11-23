'use strict';

angular.module('myApp.aboutMe', ['ngRoute','angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/aboutMe', {
    templateUrl: 'aboutMe/aboutMe.html',
    controller: 'aboutMeCtrl'
  });
}])

.controller('aboutMeCtrl', ["FileUploader","$scope", function(FileUploader,$scope) {
  var uploader = $scope.uploader = new FileUploader({
    url: 'C:\\123\\Weekly',
    queueLimit: 1,//文件个数
    autoUpload: true
  });
  $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
    uploader.clearQueue();
  }
  uploader.onAfterAddingFile = function(fileItem) {
      $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
      console.log(fileItem);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      $scope.uploadStatus = true;   //上传成功则把状态改为true
      alert(response.path);
  };
  $scope.UploadFile = function(){
      uploader.uploadAll();
      console.log(status);
      if(status){
              alert('上传成功！');
      }else{
              alert('上传失败！');
      }
  }

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