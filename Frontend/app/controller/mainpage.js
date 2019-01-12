'use strict';

angular.module('myApp.mainPage', [])

.controller('mainPageCtrl',  ["$http", "$scope",function($http, $scope) {
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if( userInfo && userInfo.type === 'leader'){
        gotomanagerpage();
    }
    else if(userInfo && userInfo.type === 'worker'){
        gotouserpage();
    }
    else{
        var mainpage = document.getElementById("mainpage");
        mainpage.style.display = 'block';
    }

    // 登录
    $scope.login = function(){
        debugger;
        // alert("用户名"+$scope.username+"密码"+$scope.password);

        $http({
            method: "POST",
            url: "http://127.0.0.1:5000/login",
            dataType: 'JSON',
            data:{"wnumber":$scope.wnumber,"password":$scope.password},
          }).
          success(function(data, status) {
           //$scope.status = status;
            console.log(data);
            if(data){
                // alert("用户名或密码错误！");
                sessionStorage.setItem('userInfo', JSON.stringify(data));
                if(data.type === 'leader'){
                    gotomanagerpage();
                }
                else if(data.type === 'worker'){
                    gotouserpage();
                }
                else{
                    alert('管理员未审核！');
                }
            }
            else{
                alert("工号或密码错误！");
            }
          }).
          error(function(data, status) {
              console.log(data);
              alert("网络错误！");
         });

    }

    document.onkeydown = keyDown;
    //回车
    function keyDown(e) {
        var e =e||event;
        var key=e.keyCode||e.which||e.charCode;
        if(key==0xD){
            // 判断是否按下回车键
            // 按下回车登陆
            $scope.login();
        }
    }


    // 注册
    $scope.signup = function(){



        debugger;
        //alert("用户名"+$scope.username+"密码"+$scope.password+"邮箱"+$scope.email);
        if($scope.password !== $scope.retype_password){
            alert("两次输入密码不一致！");
        }
        else{

            $http({
                method: "POST",
                url: "http://127.0.0.1:5000/signup",
                dataType: 'JSON',
                data:{"name":$scope.newusername,"password":$scope.password,"email":$scope.email}
              }).
              success(function(data, status) {
               //$scope.status = status;
                console.log(data);
                if(data){
                    alert("注册成功！请等待工号分配！");
                    // 清空表单
                    $scope.password = '';
                    $scope.newusername = '';
                    $scope.email = '';
                    $scope.retype_password = '';
                    gotologinpage();
                }
                else{
                    alert("注册失败，请检查网络！");
                }
              }).
              error(function(data, status) {
                  console.log(data);
             });
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

    var newurls = window.location.href.split('/#?/');

    debugger;
    window.location.href = newurls[0] + '/#?/' + 'myWeekly';

    if(sessionStorage.getItem('status') !== 'login'){
        window.history.go(0);
        sessionStorage.setItem('status','login');
    }
}

function gotomanagerpage(){
    var mainpage = document.getElementById("mainpage");
    mainpage.style.display = "none";

    var userpage = document.getElementById("userview");
    userpage.style.display = "none";

    var adminpage = document.getElementById("adminview");
    adminpage.style.display = "block";

    var newurls = window.location.href.split('/#?/');

    debugger;
    window.location.href = newurls[0] + '/#?/' + 'weeklyManager';

    if(sessionStorage.getItem('status') !== 'login'){
        window.history.go(0);
        sessionStorage.setItem('status','login');
    }
}

function logout(){
    var mainpage = document.getElementById("mainpage");
    mainpage.style.display = "block";

    var userpage = document.getElementById("userview");
    userpage.style.display = "none";

    var adminpage = document.getElementById("adminview");
    adminpage.style.display = "none";

    var newurls = window.location.href.split('/#?/');
    window.location.href = newurls[0];
    debugger;

    sessionStorage.clear()
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
    // 清空表单
    $scope.password = '';
    $scope.newusername = '';
    $scope.email = '';
    $scope.retype_password = '';
}