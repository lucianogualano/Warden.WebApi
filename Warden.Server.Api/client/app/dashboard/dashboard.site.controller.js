(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardSiteController', DashboardSiteController);

    // TODO: pass in notification service to report errors
    DashboardSiteController.$inject = ['SiteService', '$log', '$location'];

    function DashboardSiteController(SiteService, $log, $location) {
        /* jshint validthis:true */
        var vm = this;

        // Functions
        vm.getSites = getSites;
        vm.create = create;
        vm.add = add;
        vm.remove = remove;
        vm.activeSite = {};

        // Default new site ID is empty, the server generates ID
        vm.newSite = {
            Id: 0
        };

        vm.sites = [];
        vm.title = 'Dashboard';

        activate();

        /**
         * @namespace SiteQueryController
         * @desc Get all sites
         * @memberOf Controller
         */
        function getSites() {
            $log.message = "get all sites";

            // Use the site service to get all the sites
            SiteService.getSites()
            .then(function (results) {
                vm.sites = results.data;
            }, function (error) {
                //$window.alert(error.message);
            });
        }

        /**
        * @namespace SiteQueryController
        * @desc Create a new site if it is valid
        * @memberOf Controller
        */
        function create() {
            $location.path('/companyedit/0');
            // Add the new site
            //var createdSite = vm.add(vm.newSite);

            // Set the active site
            //vm.activeSite = 
            // Reset the new site for the next creation
            //vm.newSite = {};
        }

        /**
         * @namespace DashboardSiteController
         * @desc Add a site
         * @memberOf Controller
         */
        function add(site) {
            $log.message = "insert new site " + site.Name;

            // Validate on clide side?            

            // Insert the new side on the server side.
            // Check if validation error occurs?
            SiteService.insertSite(site);

            // Add the new site to the client side collection
            //vm.sites.push(site);

            //return site;
        }

        /**
         * @namespace SiteQueryController
         * @desc Delete site from the server and update the client view model collection
         * @memberOf Controller
         */
        function remove(id) {
            // Delete the site from the server persistence
            SiteService.deleteSite(id)
            .then(function (results) {
                // Update the client side by deleting the binded grid data model collection
                var findSite = vm.sites.filter(function (s) {
                    return s.Id === id;
                });
                // Remove view model collection based on the filter result, should be only one element
                if (findSite.length === 1) {
                    var index = vm.sites.indexOf(findSite)
                    vm.sites.splice(index, 1);
                }
            }, function (error) {
                //$window.alert(error.message);
            });
        }

        /**
         * @namespace DashboardSiteController
         * @desc When loading page get all the sites from the server
         * @memberOf Controller
         */
        function activate() {
            // Get all the sites
            vm.getSites();
        }
    }
})();
