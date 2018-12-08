'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.weeklyManager',
    'myApp.signupManager',
    'myApp.myWeekly',
    'myApp.aboutMe',
    'myApp.version',
    'myApp.mainPage'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    // 设置路由定位前缀
    $locationProvider.hashPrefix('?');
    // 设置view路由默认值
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(userInfo && userInfo.type=== 'admin'){
        $routeProvider.otherwise({redirectTo: '/weeklyManager'});
    }
    else if(userInfo && userInfo.type === 'user'){
        $routeProvider.otherwise({redirectTo: '/myWeekly'});
    }
    else{
        $routeProvider.otherwise({redirectTo: '/'});
    }

    // 两句语句作用的结果是 url#[前缀][路由默认值]
}])

.controller('sidebarCtrl', ["$scope", function($scope) {
    // 设置默认选中的标签名 方便js调整样式 设置默认样式
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(userInfo && userInfo.type=== 'user'){
        $scope.selectOne = 'myWeekly';
        $scope.myWeekly = 'sideButtonSelected';
        $scope.myWeeklyLabel = 'sideButtonLabelSelected';
        $scope.aboutMe = 'sideButton';
        $scope.aboutMeLabel = 'sideButtonLabel';
    }
    else if(userInfo && userInfo.type === 'admin'){
        $scope.selectOne = 'weeklyManager';
        $scope.weeklyManager = 'sideButtonSelected';
        $scope.weeklyManagerLabel = 'sideButtonLabelSelected';
        $scope.signupManager = 'sideButton';
        $scope.signupManagerLabel = 'sideButtonLabel';
     }
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