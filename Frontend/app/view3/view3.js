'use strict';

angular.module('myApp.view3', ['ngRoute','angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ["FileUploader","$scope", function(FileUploader,$scope) {
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
}]);