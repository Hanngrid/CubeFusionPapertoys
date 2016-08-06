/**
 * Created by Enman on 06/07/2016.
 */
angular.module("myApp").controller("adminUsersController", function ($http, service, $window) {

    var me = this;

    me.userList = [];
    me.currentView = 'view/adminComponents/adminUsers/listUsers.html';
    me.currentUser = {};
    me.mode = "READ";
    me.title = "";


    var setCurrentUser = function(user){
        me.currentUser = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            birthDate: user.birthDate,
            nickName: user.nickName,
            password: user.password,
            twitter: user.twitter,
            facebook: user.facebook,
            myAnimeList: user.myAnimeList,
            youtube: user.youtube,
            avatar: user.avatar
        };
    };


    me.openReadPanel = function (user) {
        setCurrentUser(user);
        me.mode = "READ";
        me.title = user.name;
        me.currentView = 'view/adminComponents/adminUsers/crudUsers.html';
    };

    me.openUpdatePanel = function (user) {
        setCurrentUser(user);
        me.mode = "EDIT";
        me.title = user.name;
        me.currentView = 'view/adminComponents/adminUsers/crudUsers.html';
    };

    me.openCreatePanel = function () {
        me.currentUser = {
            id: null,
            name: null,
            lastName: null,
            email: null,
            age: null,
            birthDate: null,
            nickName: null,
            password: null,
            twitter: null,
            facebook: null,
            myAnimeList: null,
            youtube: null,
            avatar: null
        };
        me.mode = "CREATE";
        me.currentView = 'view/adminComponents/adminUsers/crudUsers.html';
    };

    me.deleteUser = function (user) {
        if($window.confirm("Eliminar al usuario " + user.nickName + "?")) {
            deleteUserDB(user.id);
        }
    };

    me.cancel = function () {
        me.currentAnime = null;
        me.currentView = 'view/adminComponents/adminUsers/listUsers.html';
    };

    me.save = function () {
        if(me.mode == "EDIT"){
            updateUser(me.currentUser);
        }else{
            createUser(me.currentUser);
        }
    };





//__________________________________________________________________________________
//________________    DATABASE                          ____________________________
//__________________________________________________________________________________

    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    var getAllUsers = function () {
        me.userList = [];
        $http.post(
            "http://cubefusionpapertoys.com/database/users/getAllUsers.php",
            {},
            config
        ).success(function (response) {
            for (var i = 0; i < response.users.length; i++) {
                response.users[i].id = Number(response.users[i].id);
                response.users[i].age = Number(response.users[i].age);
                response.users[i].birthDate = new Date(response.users[i].birthDate);
            }

            me.userList = response.users;
        });
    };

    var updateUser = function(user) {
        $http.post(
            "http://cubefusionpapertoys.com/database/users/updateUser.php",
            user,
            config
        ).success(function () {
                getAllUsers();
                me.cancel();
            });
    };

    var createUser = function(user) {
        $http.post(
            "http://cubefusionpapertoys.com/database/users/createUser.php",
            user,
            config
        ).success(function () {
                getAllUsers();
                me.cancel();
            });
    };

    var deleteUserDB = function(id) {
        $http.post(
            "http://cubefusionpapertoys.com/database/users/deleteUser.php",
            {
                id: id
            },
            config
        ).success(function () {
                getAllUsers();
                me.cancel();
            });
    };

    getAllUsers();
});