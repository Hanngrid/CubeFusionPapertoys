//myApp

angular.module("myApp",['ngRoute','autocomplete','textAngular']);


angular.module("myApp").directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});

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
    $scope.message = 'Esta es la página "Acerca de"';
});

angular.module("myApp").controller('contactController', function($scope) {
    $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});

angular.module("myApp").controller('mainController', function($scope) {
    $scope.message = 'Esta es la página de "Inicio"';
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

    ret.route = "/Proyectos/CubeFusionPapertoys/images/";
    //ret.route = "/images/";

    ret.routes = {
        animeImages: ret.route + "animes/",
        paperImages: ret.route + "papertoys/",
        modelImages: ret.route + "models/"
    };

    return ret;
});