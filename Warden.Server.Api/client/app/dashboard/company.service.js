(function () {
    'use strict';

    // Create a company service to perform CRUD operations
    angular
       .module('app')
       .factory('CompanyService',CompanyService);

    CompanyService.$inject = ['$http', 'authService','$log'];

    // Contains all the CRUD functions
    function CompanyService($http, authService, $log) {

        var urlBase = '/api/company/';
        var service = {
            getCompanyById: getCompanyById,
            getCompanys: getCompanys,
            insert: insert,
            update: update,
            deleteCompany: deleteCompany,
        };

        return service;
        /**
         *
        */
        function createHeader() {
            var token = authService.getToken();
            $log.debug(token);

            var headers = {};
            //if (token) {
            //    headers.Authorization = 'Bearer ' + token;
            //}
            return headers;
        }

        //Get all the companys
        function getCompanyById(id) {

            var headers = createHeader();

            $log.debug("Trying to get company id " + id);
            var result = $http.get(urlBase + id, { headers });

            return result; //deferrer
        };

        //Get all the companys
        function getCompanys() {
            var result = $http.get(urlBase);
            return result; //deferrer
        };

        // Insert new company
        function insert(company) {

            //var headers = createHeader();

            //$log.debug("Trying to get company id " + company.Id);
            //var result = $http.post(urlBase + company.Id, { headers });

            //return result; //deferrer

            return $http.post(urlBase, company)
                .then(function (results) {
                    company.Id = results.data.Id;
                    return results;
                });
        };

        // Insert new company
        function update(company) {
            return $http.put(urlBase, company)
                .then(function (results) {
                    company.id = results.data.id;
                    return results.data;
                });
        };

        // Delte company
        function deleteCompany(id) {
            return $http.delete(urlBase + id)
            .then(function (results) {
                return results.data;
            });
        }
    };

})();