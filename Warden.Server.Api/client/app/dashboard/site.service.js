(function () {
    'use strict';

    // Create a site service to perform CRUD operations
    angular
       .module('app')
       .factory('SiteService', SiteService);

    SiteService.$inject = ['$http'];

    // Contains all the CRUD functions
    function SiteService($http) {

        var urlBase = '/api/sites/';
        var service = {
          getSite: getSite,
          getSites: getSites,
          insertSite: insertSite,
          updateSite : updateSite,
          deleteSite : deleteSite,          
        };
      
        return service;


        //Get all the sites
        function getSite(id) {
            var result = $http.get(urlBase + id);
            return result; //deferrer
        };

         //Get all the sites
        function getSites() {
            var result = $http.get(urlBase);
            return result; //deferrer
        };

        // Insert new site
        function insertSite(site) {
            return $http.post(urlBase, site)
                .then(function (results) {
                    site.id = results.data.id;
                    return results.data;
                });
        };

        // Insert new site
        function updateSite(site) {
            return $http.put(urlBase, site)
                .then(function (results) {
                    site.id = results.data.id;
                    return results.data;
                });
        };

        // Delte site
        function deleteSite(id) {
            return $http.delete(urlBase + id)
            .then(function (results) {
                return results.data;
            });
        }
    };

})();