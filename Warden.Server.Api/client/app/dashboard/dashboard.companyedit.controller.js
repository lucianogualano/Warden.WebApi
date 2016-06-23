(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardCompanyEditController', DashboardCompanyEditController);

    // TODO: pass in notification service to report errors
    DashboardCompanyEditController.$inject = ['siteService', '$routeParams','$log'];

    function DashboardCompanyEditController(siteService, $routeParams,$location) {
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

        vm.companyId = ($routeParams.companyId) ? parseInt($routeParams.companyId) : 0,
        vm.title = (vm.companyId > 0) ? 'Edit' : 'Add';
        vm.buttonText = (customerId > 0) ? 'Update' : 'Add';

        vm.sites = [];
        vm.company = {};
        vm.title = 'Dashboard';

        activate();


        /**
         * @namespace DashboardCompanyEditController
         * @desc When loading page get all the sites from the server
         * @memberOf Controller
         */
        function activate() {
            // Get all the sites
            if (vm.companyId > 0) {
                siteService.getSite(companyId).then(function (company) {
                    vm.company = company;
                }, processError);
            } else {
                siteService.newCompany().then(function (company) {
                    vm.company = company;
                });
            }

        }
    }
})();
