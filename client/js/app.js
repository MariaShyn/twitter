'use strict';

var app = angular.module("twitter",[
    "ui.router",
    "ui.bootstrap"
]);

app.config([
    "$locationProvider",
    "$stateProvider",
    "$httpProvider",
    function($locationProvider, $stateProvider, $httpProvider) {

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.withCredentials = true;

        $stateProvider
            .state('#', {
                url: '',
                controller: 'homeCtrl',
                templateUrl: 'pages/welcome.html'
            })
            .state('profile', {
                url: '/profile',
                controller: 'profileCtrl',
                templateUrl: 'pages/user.html'
            })
            .state('about', {
                url: '/about',
                controller: 'aboutCtrl',
                templateUrl: 'pages/about.html'
            })
            .state('contact', {
                url: '/contact',
                controller: 'contactCtrl',
                templateUrl: 'pages/contact.html'
            });

    }]);