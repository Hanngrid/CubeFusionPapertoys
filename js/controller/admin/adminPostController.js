/**
 * Created by Enman on 06/08/2016.
 */
angular.module("myApp").controller("adminPostsController", function ($http, service, $window) {

    var me = this;

    me.postsList = [];
    me.categoryList = [];

    me.currentView = 'view/adminComponents/adminPosts/listPosts.html';
    me.currentPost = {};
    me.title = "";



    var setCurrentPaper = function(){
        return {
            //id,
            //title,
            //shortTitle,
            //category,
            //tags,
            //text,
            //autor,
            //creationDate
        };
    };

    me.openCreatePanel = function () {
        me.currentPost = {
            id: 0,
            title: null,
            shortTitle: null,
            categoryId: 0,
            category: 0,
            tags: null,
            text: null,
            author: null,
            creationDate: new Date()
        };
        me.mode = "CREATE";
        me.currentView = 'view/adminComponents/adminPosts/crudPosts.html';
    };



//__________________________________________________________________________________
//________________    DATABASE                          ____________________________
//__________________________________________________________________________________

    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    var getPosts = function () {
        $http.post(
            "http://cubefusionpapertoys.com/database/posts/getAllPosts.php",
            {},
            config
        ).success(function (response) {
            me.postsList = response.posts;
        });
    };

    var getCategories = function () {
        $http.post(
            "http://cubefusionpapertoys.com/database/posts/getAllCategories.php",
            {},
            config
        ).success(function (response) {
            me.categoryList = response.categories;
        });
    };



    getCategories();
    getPosts();

});