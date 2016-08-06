/**
 * Created by Enman on 06/07/2016.
 */
angular.module("myApp").controller("adminAnimesController", function($http, service, $window){

    var me = this;

    me.service = service;

    me.imageRoute = me.service.routes.animeImages;

    me.currentView = 'view/adminComponents/adminAnimes/listAnimes.html';
    me.currentAnime = null;
    me.mode = "READ";
    me.title = "";



    me.openReadPanel = function(anime){
        me.currentAnime = anime;
        me.mode = "READ";
        me.title = anime.name;
        me.currentView = 'view/adminComponents/adminAnimes/crudAnimes.html';
    };

    me.openUpdatePanel = function(anime){
        me.currentAnime = anime;
        me.mode = "EDIT";
        me.title = anime.name;
        me.currentView = 'view/adminComponents/adminAnimes/crudAnimes.html';
    };

    me.openCreatePanel = function(){
        me.currentAnime = {
            id: 0,
            name: "",
            imageName: ""
        };
        me.mode = "CREATE";
        me.currentView = 'view/adminComponents/adminAnimes/crudAnimes.html';
    };

    me.deleteAnime = function(anime){
        if($window.confirm("Eliminar el anime " + anime.name + "?")) {
            deleteAnimeDB(anime.id);
        }
    };

    me.cancel = function(){
        me.currentAnime = null;
        me.currentView = 'view/adminComponents/adminAnimes/listAnimes.html';
    };

    me.save = function(){
        if(me.mode == "EDIT"){
            updateAnime(me.currentAnime);
        }else{
            createAnime(me.currentAnime);
        }
    };



    me.orderColumn = 'id';

    me.changeOrder = function(newOrder){
        if(newOrder == me.orderColumn){
            me.orderColumn = '-' + newOrder;
        }else{
            me.orderColumn = newOrder;
        }
    };



//__________________________________________________________________________________
//________________    DATABASE                          ____________________________
//__________________________________________________________________________________

    var config= {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    var getAllAnimes = function() {
        $http.post(
            "http://cubefusionpapertoys.com/database/anime/getAnimes.php",
            {},
            config
        ).success(function (response) {
                for (var i = 0; i < response.animes.length; i++) {
                    response.animes[i].id = Number(response.animes[i].id);
                    response.animes[i].paperCount = Number(response.animes[i].paperCount);
                }
                me.animeList = response.animes;

            });
    };

    var updateAnime = function(anime) {
        $http.post(
            "http://cubefusionpapertoys.com/database/anime/updateAnime.php",
            {
                id: anime.id,
                name: anime.name,
                imageName: anime.imageName
            },
            config
        ).success(function () {
            getAllAnimes();
            me.cancel();
        });
    };

    var createAnime = function(anime) {
        $http.post(
            "http://cubefusionpapertoys.com/database/anime/createAnime.php",
            {
                name: anime.name,
                imageName: anime.imageName
            },
            config
        ).success(function () {
            getAllAnimes();
            me.orderColumn = '-id';
            me.cancel();
        });
    };

    var deleteAnimeDB = function(id) {
        $http.post(
            "http://cubefusionpapertoys.com/database/anime/deleteAnime.php",
            {
                id: id
            },
            config
        ).success(function () {
            getAllAnimes();
            me.cancel();
        });
    };

    getAllAnimes();
});