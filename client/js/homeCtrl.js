/**
 * Created by BOSS on 05.07.2016.
 */
(function(){
    'use strict';

    angular
        .module('twitter')
        .controller("homeCtrl", [
            '$http',
            '$scope',
            "$location",
            function($http, $scope, $location){

                $scope.signIn = signIn;
                $scope.signUp = signUp;

                function signIn() {
                    var sendData = angular.copy($scope.auth);
                    console.log(sendData.email + "    " + sendData.password)
                    $http.post('/', sendData)
                        .success(function(data){
                            $location.path("/profile");
                        })
                        .error(function(err){
                            alert(err);
                        });
                }

                function signUp() {
                    var sendData = angular.copy($scope.newUser);
                    $http.post('/signup', sendData)
                        .success(function(data){
                            $location.path("/profile");
                        })
                        .error(function(err){
                            alert(err);
                        });
                }
            }]);
}());
