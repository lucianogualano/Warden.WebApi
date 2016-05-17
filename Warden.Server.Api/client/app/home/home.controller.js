﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', 'ngDialog', '$log', 'authService'];

    function HomeController($location, ngDialog, $log, authService) {
        /* jshint validthis:true */
        var vm = this;

        $log.debug("Just started home controller!");

        vm.signup = signup;
        vm.login = login;
        vm.username = null;
        vm.email = null;
        vm.password = null;
        vm.errorMessage = null;
        vm.title = 'Home';

        /**
         *   @description Authenticate user credentials to log into application
         *   @private
         */
        function loginWithService(username, email, password) {
            // Set default GUID for ID to empty
            var id = "00000000-0000-0000-0000-000000000000";

            authService.login(id, username, email, password).then(function (status) {
                $log.debug("Signed up user " + vm.username + " status is " + status.status);
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (status.status != 200) {
                    vm.errorMessage = status.data.UserName[0];
                    return;
                }

                $location.path('/dashboard');

                // Close the popup login dialog
                ngDialog.closeAll();
            });
        }

        /**
         *  @description Authenticate user credentials to log into application         
         */
        function login() {
            $log.debug("Login user");
            // TODO: Open login dialog.
        }

        /**
         *  @description Send login registration details
         */
        function signup($location, authService, $log) {
            loginWithService(vm.username, vm.email, vm.password);
        }
    }
})();