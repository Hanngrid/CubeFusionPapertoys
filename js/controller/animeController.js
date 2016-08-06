/**
 * Created by Enman on 06/07/2016.
 */

angular.module("myApp")
    .controller("animeCtrl", function ($http, $window, service) {

        var an = this;

        an.service = service;

        an.imageRoute = an.service.routes.animeImages;
        an.paperRoute = an.service.routes.paperImages;

        an.mode = 'anime';

        var config= {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

//__________________________________________________________________________________
//________________    ANIMES                            ____________________________
//__________________________________________________________________________________

        an.animeList = [];

        an.calculateName = function(name){
            var shortName = name;
            if(name.length > 22){
                shortName = name.substring(0, 20) + "...";
            }

            return shortName;
        };

        $http.post(
            "http://cubefusionpapertoys.com/database/anime/getAnimes.php",
            {},
            config
        ).success(function(response){
            an.animeList = response.animes;
        });



//__________________________________________________________________________________
//________________    PAPERTOYS                            ____________________________
//__________________________________________________________________________________

        an.papertoyList = [];
        an.animeImageName = "";

        an.getPapertoys = function(a){

            an.mode = 'paper';

            an.searchTextPre = an.searchText;
            an.letterPre = an.letter;

            $http.post(
                "http://cubefusionpapertoys.com/database/papertoys/getAllPapersByAnime.php",
                {
                    idAnime: Number(a.id)
                },
                config
            ).success(function(response){
                an.papertoyList = response.papertoys;
                an.animeImageName = a.imageName;
                $window.scrollTo(0, 0);
                an.searchText = "Buscar";
                an.letter = "all";
            });

        };

        an.back = function(){
            an.mode = 'anime';
            an.papertoyList = [];
            an.animeImageName = "";
            $window.scrollTo(0, 0);
            an.searchText = an.searchTextPre;
            an.letter = an.letterPre;
        };

        an.calculatePaperName = function(name){
            var shortName = name;
            if(name.length > 17){
                shortName = name.substring(0, 15) + "...";
            }

            return shortName;
        };




//__________________________________________________________________________________
//________________    FILTRADO                          ____________________________
//__________________________________________________________________________________


        an.letter = "all";
        an.searchText = "Buscar";

        an.letterPre = "";
        an.searchTextPre = "";

        an.getClassByLetter = function(letter){
            if(letter == an.letter){

                return "active";
            }
            return "inactive";
        };

        an.setLetter = function(letter){
            an.letter = letter;
        };

        an.filterByLetter = function(name){
            if(an.searchText == "Buscar" || an.searchText == "") {
                if (an.letter == "all") {
                    return true;
                }
                if (an.letter == "*") {
                    return true;
                }

                if (name.startsWith(an.letter)) {
                    return true;
                }
            }else{
                if (name.toLowerCase().startsWith(an.searchText.toLowerCase())) {
                    an.letter = "all";
                    return true;
                }
            }

            return false;
        };


        an.reset = function(){
            if(an.searchText == "Buscar"){
                an.searchText = "";
            }
        };

        an.searchTextBlur = function(){
            if(an.searchText == ""){
                an.searchText = "Buscar";
            }
        };

    });

























