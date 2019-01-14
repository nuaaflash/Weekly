'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.weeklyManager',
    'myApp.signupManager',
    'myApp.myWeekly',
    'myApp.aboutMe',
    'myApp.version',
    'myApp.mainPage',
    'myApp.searchCenter',
    'myApp.addTask',
    'myApp.approveAsking'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    // 设置路由定位前缀
    $locationProvider.hashPrefix('?');
    // 设置view路由默认值
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(userInfo && userInfo.Wnumber != -1){
        $routeProvider.otherwise({redirectTo: '/myWeekly'});
    }
    else{
        $routeProvider.otherwise({redirectTo: '/'});
    }

    // 两句语句作用的结果是 url#[前缀][路由默认值]
}])

.controller('frameCtrl', ["$scope", function($scope) {
    $scope.right_selectMenu = {'display': 'none'};
    // 设置默认选中的标签名 方便js调整样式 设置默认样式
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    $scope.photo = userInfo.photo;
    $scope.hasSub = userInfo.hasSub;
    $scope.selectOne = 'myWeekly';
    $scope.myWeekly = 'sideButtonSelected';
    $scope.myWeeklyLabel = 'sideButtonLabelSelected';
    $scope.weeklyManager = 'sideButton';
    $scope.weeklyManagerLabel = 'sideButtonLabel';
    $scope.signupManager = 'sideButton';
    $scope.signupManagerLabel = 'sideButtonLabel';
    $scope.aboutMe = 'sideButton';
    $scope.aboutMeLabel = 'sideButtonLabel';
    $scope.taskManager = 'sideButton';
    $scope.taskManagerLabel = 'sideButtonLabel';
    $scope.searchCenter = 'sideButton';
    $scope.searchCenterLabel = 'sideButtonLabel';
    $scope.approveAsking = 'sideButton';
    $scope.approveAskingLabel = 'sideButtonLabel';
    $scope.askForLeave = 'sideButton';
    $scope.askForLeaveLabel = 'sideButtonLabel';
     // 设置用户名
    debugger;
     $scope.username = userInfo && userInfo.name ? userInfo.name:"";
     // 用户名悬浮下拉框样式
    $scope.over_selectMenu = function () {
        $scope.p_selectMenu='selectMenuButton';
        $scope.p_selectMenuLabel='selectMenuLabel';
        $scope.l_selectMenu='selectMenuButton';
        $scope.l_selectMenuLabel='selectMenuLabel';
        $scope.right_selectMenu={'display':'block'};
    };
    $scope.over_personal = function(){
        $scope.p_selectMenu='selectMenuButtonSelected';
        $scope.p_selectMenuLabel='selectMenuLabelSelected';
    };
    $scope.leave_personal = function(){
        $scope.p_selectMenu='selectMenuButton';
        $scope.p_selectMenuLabel='selectMenuLabel';
    };
    $scope.over_logout = function(){
        $scope.l_selectMenu='selectMenuButtonSelected';
        $scope.l_selectMenuLabel='selectMenuLabelSelected';
    };
    $scope.leave_logout = function(){
        $scope.l_selectMenu='selectMenuButton';
        $scope.l_selectMenuLabel='selectMenuLabel';
    };
    // 选择改变侧边栏样式
    $scope.selectThis = function(selectedOne){
        // 点选的标签和当前标签一致时 直接返回 不改变样式
        if($scope.selectOne && selectedOne === $scope.selectOne){
            return;
        }
        // 恢复之前被选择的侧边栏标签
        $scope[$scope.selectOne] = 'sideButton';
        $scope[$scope.selectOne+'Label'] = 'sideButtonLabel';
        // 改变当前被选中的样式
        $scope[selectedOne] = 'sideButtonSelected';
        $scope[selectedOne+'Label'] = 'sideButtonLabelSelected';

        $scope.selectOne = selectedOne;
    };
}]);