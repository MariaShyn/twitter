/**
 * Created by Masha on 04.12.2016.
 */
(function () {

    angular
        .module('twitter')
        .directive('navigation', navigation);

    function navigation () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navigation.html',
            controller: 'navigationCtrl as navvm'
        };
    }

})();