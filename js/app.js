//myApp

angular.module("myApp",['ngRoute','autocomplete']);


angular.module("myApp").config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl	: 'view/main.html',
            controller 	: 'mainController'
        })
        .when('/papertoys', {
            templateUrl	: 'view/papertoys.html',
            controller 	: 'animeCtrl'
        })
        .when('/acerca', {
            templateUrl : 'view/about.html',
            controller 	: 'aboutController'
        })
        .when('/contacto', {
            templateUrl : 'view/contact.html',
            controller 	: 'contactController'
        })
        .when('/admin', {
            templateUrl : 'view/admin.html',
            controller 	: 'adminController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angular.module("myApp").controller('aboutController', function($scope) {
    $scope.message = 'Esta es la p�gina "Acerca de"';
});

angular.module("myApp").controller('contactController', function($scope) {
    $scope.message = 'Esta es la p�gina de "Contacto", aqu� podemos poner un formulario';
});

angular.module("myApp").controller('mainController', function($scope) {
    $scope.message = 'Esta es la p�gina de "Inicio"';
});


angular.module("myApp").controller("mainCtrl", function(service){
    var cab = this;

    cab.service = service;

    cab.logout = function(){
        cab.service.loggedUser = {};
        cab.service.name = "";
        cab.service.password = "";
    };

});

angular.module("myApp").factory("service", function(){

    var ret = function(){};

    ret.loggedUser = {};
    ret.name = "";
    ret.password = "";

    ret.routes = {
        animeImages: "/cubefusion/CubeFusionPapertoysWeb/images/animes/"
    };

    //ret.routes = {
    //    animeImages: "/images/animes/"
    //};

    return ret;
});