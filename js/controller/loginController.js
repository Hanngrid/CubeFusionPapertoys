/**
 * Created by Enman on 06/07/2016.
 */

angular.module("myApp").controller("loginCtrl", function($http, service){
    var login = this;

    login.service = service;

    login.name = null;
    login.password = null;

    //login.service.loggedUser = {};

    login.service.loggedUser.nickName = "Nenrei";


    login.checkUserData = function(){

        var config= {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

        $http.post(
            "http://cubefusionpapertoys.com/database/login.php",
            {
                name: login.name,
                pass: login.password
            },
            config
        ).success(function(response){
            if(response.userData !== undefined){
                login.service.loggedUser = response.userData[0];
                login.service.name = login.name;
                login.service.password = login.password;

                login.name = null;
                login.password = null;
            }else{
                login.status = "Usuario o password incorrectos";
            }

        });

    };

});