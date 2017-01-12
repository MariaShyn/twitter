/**
 * Created by Masha on 04.12.2016.
 */
(function () {

    angular
        .module('twitter')
        .controller('navigationCtrl', [
            '$location',
            'authentication',
            function ($location, authentication) {
                var vm = this;
                vm.isLoggedIn = authentication.isLoggedIn();

                vm.logout = function(){
                    authentication.logout();
                    $location.path('/');
                };
            }])

})();