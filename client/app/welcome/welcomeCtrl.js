/**
 * Created by BOSS on 05.07.2016.
 */
(function(){
    'use strict';

    angular
        .module('twitter')
        .controller("homeCtrl", [
            "$location",
            'authentication',
            function($location, authentication){
                var vm = this;

                vm.auth = {}, vm.newUser = {}

                vm.signIn = function() {
                    authentication
                        .login(vm.auth)
                        .error(function(err){
                            alert(err);
                        })
                        .then(function(){
                            $location.path('profile');
                        });
                }

                vm.signUp = function() {
                    authentication
                        .register(vm.newUser)
                        .error(function(err){
                            alert(err);
                        })
                        .then(function(){
                            $location.path('profile');
                        });
                }
            }]);
}());
