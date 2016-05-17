﻿(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider', '$logProvider', 'ngDialogProvider'];
    run.$inject = ['$rootScope', '$location','authService'];

    var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.grid', 'ui.grid.edit', 'ngDialog', 'LocalStorageModule', 'ngMap']);
    app.config(config);
    app.run(run);

    /**
     * Application run entry point, listen for main events
     */
    function run($rootScope, $location, authService) {
        $rootScope.$on("$routeChangeStart", function (evt, to, from) {
            if (to.authorize === true) {
                if (!authService.authentication.isAuthenticated) {
                    $location.path("/");
                }
            }
        });

        $rootScope.$on("$routeChangeError", function (evt, to, from, error) {
            if (error instanceof AuthorizationError) {
                $location.path("/login").search("returnTo", to.originalPath);
            }
        });

        $(document).ready(function () {
            $('[data-toggle=offcanvas]').click(function () {
                $('.row-offcanvas').toggleClass('active');
            });
        });
    }

    /**
     * Application configuration entry point to configure routing.
     */
    function config($routeProvider, $locationProvider, $logProvider, ngDialogProvider) {
        $routeProvider.when('/', {
            templateUrl: '/pages/home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl'
        })
                      .when('/about', {
                          templateUrl: '/pages/about.html'
                      })
                       .when('/contact', {
                           templateUrl: '/pages/contact.html'
                       })
                      .when('/sites', {
                          templateUrl: '/pages/sites.html',
                          controller: 'SiteQueryController',
                          controllerAs: 'siteQueryController'
                      })
                     .when('/dashboard', {
                         templateUrl: '/pages/dashboard.html',
                         controller: 'DashboardController',
                         controllerAs: 'dashboardController',
                         authorize: true
                     })
                     .otherwise({
                         redirectTo: "/"
                     });
        //GoogleMapApi.configure({
        //    //    key: 'your api key',
        //    v: '3.17',
        //    libraries: 'places'
        //});

        $locationProvider.html5Mode(true);

        $logProvider.debugEnabled(true);

        ngDialogProvider.setDefaults({
            className: "ngdialog-theme-default",
            plain: false,
            showClose: true,
            closeByDocument: true,
            closeByEscape: true,
            appendTo: false
        });
    }
})();