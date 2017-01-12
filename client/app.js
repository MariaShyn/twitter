'use strict';

angular.module("twitter",[
    "ngRoute",
    "ui.bootstrap"
]);

function config($locationProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/welcome/welcome.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/profile', {
            templateUrl: 'app/profile/profile.html',
            controller: 'profileCtrl',
            controllerAs: 'vm'
        })
        .when('/about', {
            templateUrl: 'app/about/about.html',
            controller: 'aboutCtrl',
            controllerAs: 'vm'
        })
        .when('/contact', {
            templateUrl: 'app/contact/contact.html',
            controller: 'contactCtrl',
            controllerAs: 'vm'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}


function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        console.log($location.path())
        if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
            $location.path('/');
        console.log("I'm here")
        }
    });
}

angular
    .module('twitter')
    .config(['$locationProvider', '$routeProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

