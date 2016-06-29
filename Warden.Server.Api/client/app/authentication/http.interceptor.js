(function () {
    'use strict';

    angular
        .module('app')
        .factory('httpRequestInterceptor', httpRequestInterceptor);

    httpRequestInterceptor.$inject = ['$injector'];

    // Use web api to communicate with server login authenitcaion
    function httpRequestInterceptor($injector) {

        return {
            request: function (config) {
                config.headers = config.headers || {};

                //injected manually to get around circular dependency problem.
                var authService = $injector.get('authService');
                
                if (authService.isUserAuthenticated()) {

                    var token = authService.getToken();
                    if (token) {
                        config.headers['Authorization'] = 'Bearer ' + token;
                    }
                }
                return config;
            }
        };
    }
})();
