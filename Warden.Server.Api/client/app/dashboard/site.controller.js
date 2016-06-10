(function () {
    'use strict';

    angular
        .module('app')
        .controller('SiteQueryController', SiteQueryController);

    //-----------------------------------------------
    // Query Controller
    //-----------------------------------------------
    SiteQueryController.$inject = ['siteService', '$log', '$window', '$scope'];

    function SiteQueryController(siteService, $log, $window, $scope) {
        var vm = this;

        // Store new site details
        vm.newSite = {};

        // Default new site ID is empty, the server generates ID
        vm.newSite.Id = "00000000-0000-0000-0000-000000000000";

        $scope.sites = {};

        vm.gridOptions = {
            data: 'sites',
            columnDefs: [
                { field: 'Name', displayName: 'Name' },
                { field: 'Address', displayName: 'Address' },
                {
                    field: 'href',
                    name: 'Action',
                    cellEditableCondition: false,
                    cellTemplate: 'pages/edit-button.html',
                    enableFiltering: false
                    //cellTemplate:                        
                    //    '<button class ="btn" ng-click="grid.appScope.Edit(row)">\
                    //        <span class="glyphicon glyphicon-pencil" style="color:blue"></span>&nbsp;&nbsp;Edit\
                    //    </button>\
                    //    <button class ="btn" ng-click="grid.appScope.Delete(row)">\
                    //    <span class="glyphicon glyphicon-remove" style="color:red"></span>&nbsp;&nbsp;Delete\
                    //    </button>'

                }
            ],
            multiSelect: false,
            enableFiltering: true,
            showColumnMenu: false
        };


        vm.isEditVisible = false;

        /**
        * @namespace SiteQueryController
        * @desc Delete the site row from the grid and send message to server
        * @memberOf Controller
        */
        $scope.Delete = function (row) {
            $log.debug("'Deleting row " + row);
            vm.deleteSite(row);
        };

        /**
         * @namespace SiteQueryController
         * @desc Set the create new site visiblity state
         * @memberOf Controller
         */
        vm.showEdit = function () {
            vm.isEditVisible = true;
        }

        /**
         * @namespace SiteQueryController
         * @desc Add new site if it is valid
         * @memberOf Controller
         */
        vm.addNewSite = function (site) {
            vm.isEditVisible = false;
            vm.insertSite(vm.newSite);
            vm.newSite = {};
        }

        /**
         * @namespace SiteQueryController
         * @desc Delete site from the server and update the client view model collection
         * @memberOf Controller
         */
        vm.deleteSite = function (row) {
            // Delete the site from the server persistence
            siteService.deleteSite(row.entity.Id)
            .then(function (results) {
                // Update the client side by deleting the binded grid data model collection
                var index = vm.gridOptions.data.indexOf(row.entity);
                vm.gridOptions.data.splice(index, 1);
            }, function (error) {
                $window.alert(error.message);
            });
        }
        // Get all 
        vm.getSites = function () {
            $log.message = "get all sites";

            // Use the site service to get all the sites
            siteService.getSites()
            .then(function (results) {
                // vm.sites = results.data;
                $scope.sites = results.data;

            }, function (error) {
                $window.alert(error.message);
            });
        };

        // Insert the new site
        vm.insertSite = function (site) {
            $log.message = "insert new site " + site.Name;

            // Validate on clide side?            

            // Insert the new side on the server side.
            // Check if validation error occurs?
            siteService.insertSite(site);

            // Add the new site to the client side collection
            $scope.sites.push(site);
        }

        // Initialise the controller
        function init() {
            // Get all the sites
            vm.getSites();
        }

        init();
    }
})();
