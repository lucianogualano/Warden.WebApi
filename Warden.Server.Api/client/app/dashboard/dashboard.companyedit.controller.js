(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardCompanyEditController', DashboardCompanyEditController);

    // TODO: pass in notification service to report errors
    DashboardCompanyEditController.$inject = ['CompanyService', '$routeParams', '$log', '$location','$timeout'];

    function DashboardCompanyEditController(CompanyService, $routeParams, $log, $location, $timeout) {
        /* jshint validthis:true */
        var vm = this;
     
        // Functions
        vm.saveCompany = saveCompany;
        vm.deleteCompany = deleteCompany;

        vm.companyId = ($routeParams.companyId) ? parseInt($routeParams.companyId) : 0,
        vm.title = (vm.companyId > 0) ? 'Edit' : 'Add';
        vm.buttonText = (vm.customerId > 0) ? 'Update' : 'Add';

        vm.sites = [];
        vm.company = {};
        vm.title = 'Dashboard';
        vm.errorMessage = "";
        vm.CompanyService = CompanyService;

        /**
         * @namespace DashboardCompanyEditController
         * @desc When loading page get all the sites from the server
         * @memberOf Controller
         */
        function activate() {
            CompanyService.getCompanyById(vm.companyId).then(function (company) {
                vm.company = company;
            }, function (error) {
                //$window.alert(error.message);
                $log.error(error.message);
            });
            //// Get all the sites
            ////if (vm.companyId > 0) {
               
            //} else {
            //    vm.company = {
            //        companyId: vm.companyId,
            //        name: "",
            //        country: "Australia",
            //        address: "",
            //        city: "",
            //        state: "",
            //        postcode: ""
            //    }
                //siteService.newCompany().then(function (company) {
                //    vm.company = company;
                //});
            //}
        }

        activate();

        /**
    * @descr Save new or existing company
    */
        function saveCompany(isValid) {
            if (isValid) {
                if (!vm.companyId) {
                    var newCompany = {
                        Id: vm.companyId,
                        Name: vm.company.name,
                        Sites: [
                            {
                                Address: vm.company.address,
                                City: vm.company.city,
                                State: vm.company.state,
                                Country: vm.company.country,
                                Postcode : vm.company.postcode
                            }
                        ]
                    }
                    vm.CompanyService.insert(newCompany).then(function (result) {
                        if (result.status != 200) {
                            //notificationService.displayError("Authenication failed.");
                            return;
                        }

                        $location.path('/dashboard');
                    },
                    processError);
                }
            }
            else {
                //this.CompanyService.update(this.company).then(processSuccess, processError);
            }
        }

        /**
         * @descr Delete company based on ID
         */
        function deleteCompany() {
            this.CompanyService.deleteCompany(this.company.Id)
                .then(processSuccess, processError);

        }

        /**
         * @descr Handle promise return success status
         */
        function processSuccess() {
            //$scope.editForm.$dirty = false;
            // this.updateStatus = true;
            // this.title = 'Edit';
            // this.buttonText = 'Update';
            this.$location.path('/dashboard');

            startTimer();

        }

        /**
       * @descr Handle promise return error status
       */
        function processError(error) {
            this.errorMessage = error.message;
            startTimer();
        }

        function startTimer() {
            timer = this.$timeout(function () {
                this.$timeout.cancel(timer);
                this.errorMessage = '';
                this.updateStatus = false;
            }, 3000);
        }
    }

   

})();
