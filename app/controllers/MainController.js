var app = angular.module("dentistApp");
(function(app){
    app.controller("MainController", function($scope,$routeParams){
        console.log($routeParams)
        console.log("connected main controller....")
        $scope.userInfo = {};
        $scope.login = function(){
            if($scope.userInfo){
                console.log($scope.userInfo)
            }
        };
    });
})(app);
