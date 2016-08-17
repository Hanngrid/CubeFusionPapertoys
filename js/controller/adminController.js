/**
 * Created by Enman on 06/07/2016.
 */

angular.module("myApp").controller("adminController", function(service){

    var me = this;

    me.service = service;

    me.imageRoute = me.service.routes.animeImages;

    me.currentView = 'view/adminComponents/adminPosts/adminPosts.html';
    me.changeView = function(newView){
        switch(newView){
            case 0:
                me.currentView = 'view/adminComponents/adminPosts/adminPosts.html';
                break;
            case 1:
                me.currentView = 'view/adminComponents/adminAnimes/adminAnimes.html';
                break;
            case 2:
                me.currentView = 'view/adminComponents/adminPapertoys/adminPapertoys.html';
                break;
            case 3:
                me.currentView = 'view/adminComponents/adminUsers/adminUsers.html';
                break;
            default:
                me.currentView = 'view/adminComponents/adminMain.html';
                break;
        }
    };

});