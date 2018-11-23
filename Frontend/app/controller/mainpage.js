'use strict';

angular.module('myApp.mainPage', [])

.controller('mainPageCtrl', ["$scope", function($scope) {
    $scope.username = "";

    // 登录
    $scope.login = function(){
        debugger;
        //alert("用户名"+$scope.username+"密码"+$scope.password);
        if($scope.username === "admin" && $scope.password == "admin"){
            gotomanagerpage();
        }
        else if($scope.username === "user" && $scope.password == "user"){
            gotouserpage();
        }
        else{
            alert("用户名或密码错误！");
        }
    }

    // 注册
    $scope.signup = function(){
        debugger;
        //alert("用户名"+$scope.username+"密码"+$scope.password+"邮箱"+$scope.email);
        if($scope.password != $scope.retype_password){
            alert("两次输入密码不一致！");
        }
    }

}]);

function gotouserpage(){
    var mainpage = document.getElementById("mainpage");
    mainpage.style.display = "none";

    var userpage = document.getElementById("userview");
    userpage.style.display = "block";

    var adminpage = document.getElementById("adminview");
    adminpage.style.display = "none";
}

function gotomanagerpage(){
    var mainpage = document.getElementById("mainpage");
    mainpage.style.display = "none";

    var userpage = document.getElementById("userview");
    userpage.style.display = "none";

    var adminpage = document.getElementById("adminview");
    adminpage.style.display = "block";
}

function logout(){
    var mainpage = document.getElementById("mainpage");
    mainpage.style.display = "block";

    var userpage = document.getElementById("userview");
    userpage.style.display = "none";

    var adminpage = document.getElementById("adminview");
    adminpage.style.display = "none";
}

function gotologinpage(){
    var loginpage = document.getElementById("main-line");
    loginpage.style.display = "block";

    var loginpage = document.getElementById("login-page");
    loginpage.style.display = "block";

    var signup_1st = document.getElementById("first-step");
    var signup_2nd = document.getElementById("second-step");
    signup_1st.style.display = "none";
    signup_2nd.style.display = "none";
}

function goto1st(){
    var loginpage = document.getElementById("main-line");
    loginpage.style.display = "block";

    var loginpage = document.getElementById("login-page");
    loginpage.style.display = "none";

    var signup_1st = document.getElementById("first-step");
    var signup_2nd = document.getElementById("second-step");
    signup_1st.style.display = "block";
    signup_2nd.style.display = "none";
}

function goto2nd(){
    var loginpage = document.getElementById("main-line");
    loginpage.style.display = "block";

    var loginpage = document.getElementById("login-page");
    loginpage.style.display = "none";

    var signup_1st = document.getElementById("first-step");
    var signup_2nd = document.getElementById("second-step");
    signup_1st.style.display = "none";
    signup_2nd.style.display = "block";
}

function main_cancle(){
    var loginpage = document.getElementById("main-line");
    loginpage.style.display = "none";

    var loginpage = document.getElementById("login-page");
    loginpage.style.display = "none";

    var signup_1st = document.getElementById("first-step");
    var signup_2nd = document.getElementById("second-step");
    signup_1st.style.display = "none";
    signup_2nd.style.display = "none";
}