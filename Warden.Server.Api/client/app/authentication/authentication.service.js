(function () {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', '$log', 'localStorageService', 'USER_ROLES'];

    // Use web api to communicate with server login authenitcaion
    function authService($http, $log, localStorageService, USER_ROLES) {

        var serviceBase = '/api/account/';

        var authService = {
            loginPath: '/register',
            authentication: {
                isAuthenticated: false,
                email: "",
                roles: null
            },
            register: register,
            registrationFailed: registrationFailed,
            login: login,
            logout: logout
        };

        return authService;

        /**
         * @description
         */
        function register(id, username, email, password) {
            $log.debug("Register user name " + email);
            return $http.post(serviceBase + 'register', { Id: id, UserName: username, Email: email, Password: password })
                .then(function (response) {
                    storeUser(email, password);
                    $log.debug("Response status is " + response.status);
                    return response;
                },
            function (responseHeaders) {
                $log.debug("Failed sign up of user name " + email);
                factory.logout();
                return responseHeaders;
            });
        };


       /**
         * @description
         */
        function registrationFailed(response) {
            $log.debug("Registration failed");
            //notificationService.displayError('Registration failed. Try again.');
        }

        /**
         * @description
         */
        // AuthenticationService in user with credentials
        function login (id, email, password) {
            $log.debug("Login with email" + email);
            return $http.post(serviceBase + 'login', { Id: id, Email: email, Password: password })
                .then(function (response) {
                    $log.debug("Response status is " + response.status);
                    storeUser(email, password);
                    return response;
                },
            function (responseHeaders) {
                $log.debug("Failed sign up of user name " + email);
                factory.logout();
                return responseHeaders;
            });
        };

        /**
         * @description Logout
         */
        // 
        function logout() {
            clearCache();
        };

        /**
         * @description Store login credentials into local storage
         */
        function storeUser(email, password) {

            localStorageService.set('authorizationData', { Email: email });
            factory.authentication.isAuthenticated = true;
            factory.authentication.email = email;
            factory.authentication.roles = USER_ROLES.all;
        }

        /**
         * @description Remove login credentials from local storage
         */
        function clearCache() {

            localStorageService.remove('authorizationData');

            factory.authentication.isAuthenticated = false;
            factory.authentication.email = "";
            factory.authentication.roles = "";

        };
    };
})();