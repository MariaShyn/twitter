/**
 * Created by BOSS on 05.07.2016.
 */
(function(){
    'use strict';

    angular
        .module('twitter')
        .controller("profileCtrl", [
            '$http',
            'meanData',
            function($http, meanData){

                var vm = this;

                vm.user = {};
                vm.twits = [];

                meanData
                    .getProfile()
                    .success(function(data){
                        vm.user = data;
                    })
                    .error(function(err){
                        alert(err);
                    });


                vm.addNewTwit = function() {
                    var sendData = {
                        'text' : $scope.newTwit,
                        'date' : new Date()
                    }
                    $http.post('/newtwit', sendData)
                        .success(function(data){
                            vm.twits.push({
                                text : sendData.text,
                                date : sendData.date
                            })
                            vm.newTwit = '';
                        })
                        .error(function(err){
                            console.error(err);
                        });
                }
            }]);
}());
