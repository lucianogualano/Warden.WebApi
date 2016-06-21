(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$location', '$log'];
    //NgMap
    function DashboardController($scope, $location,  $log) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Dashboard';
        vm.types = "['address']";

        //NgMap.getMap().then(function (map) {
        //    vm.map = map;
        //});

        //vm.placeChanged = function () {
        //    $log.debug("Placed changed");
        //    vm.place = this.getPlace();
        //    $log.debug('location ' + vm.place.geometry.location);
        //    vm.map.setCenter(vm.place.geometry.location);
        //}
    }
})();
