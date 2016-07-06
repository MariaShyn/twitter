/**
 * Created by BOSS on 05.07.2016.
 */
(function(){
    'use strict';

    angular
        .module('twitter')
        .controller("profileCtrl", [
            '$http',
            '$scope',
            function($http, $scope){

                $scope.getProfile = getProfile;
                $scope.addNewTwit = addNewTwit;

                getProfile();

                function getProfile() {
                    $http.get('/profile')
                        .success(function(data){
                            $scope.user = data;
                            $scope.twits = data.twits;
                        })
                        .error(function(err){
                            alert(err);
                        });
                }

                function addNewTwit() {
                    var sendData = {
                        'text' : $scope.newTwit,
                        'date' : new Date()
                    }
                    console.log(sendData.text + '   ' + sendData.date)

                    $http.post('/newtwit', sendData)
                        .success(function(data){
                            $scope.twits.push({
                                text : sendData.text,
                                date : sendData.date
                            })
                            $scope.newTwit = '';
                        })
                        .error(function(err){
                            console.error(err);
                        });
                }
            }]);
}());
