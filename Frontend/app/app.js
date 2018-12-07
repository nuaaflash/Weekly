'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.weeklyManager',
  'myApp.myWeekly',
  'myApp.aboutMe',
  'myApp.version',
  'myApp.mainPage'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    // 设置路由定位前缀
    $locationProvider.hashPrefix('?');
    // 设置view路由默认值
    $routeProvider.otherwise({redirectTo: '/myWeekly'});
    // 两句语句作用的结果是 url#[前缀][路由默认值]
}])

.controller('sidebarCtrl', ["$scope", function($scope) {
    // 选择改变侧边栏样式
    $scope.selectThis = function(selectedOne){
        console.log(selectedOne);
        var selectedBG = "#373f52";
        var selectedFont = "#ffffff";
        var notSelectedBG = "#2a3245";
        var notselectedFont = "#6a707d";
        // 点选的标签和当前标签一致时 直接返回 不改变样式
        if($scope.selectOne && selectedOne === $scope.selectOne){
            return;
        }

        if(!$scope.selectOne){
            // 设置默认选中的标签名 方便js调整样式
            $scope.selectOne = "weeklyManager";
        }

        // 恢复之前被选择的侧边栏标签
        var preOne = document.getElementsByName($scope.selectOne);
        preOne[0].style.backgroundColor = notSelectedBG;
        preOne[1].style.color = notselectedFont;
        // 改变当前被选中的样式
        var thisOne = document.getElementsByName(selectedOne);
        console.log(thisOne);
        thisOne[0].style.backgroundColor = selectedBG;
        thisOne[1].style.color = selectedFont;
        $scope.selectOne = selectedOne;
    };
}]);