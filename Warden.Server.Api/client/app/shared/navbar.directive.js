(function () {
    'use strict';

    angular
        .module('app')
        .directive('wardenNavbar', NavBarDirective);

    //NavBarDirective.$inject = [];

    function NavBarDirective() {
        // Usage:
        //     <directive></directive>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: 'spa/shared/navbar.html',
            controller: 'AuthenticaitonCtrl', //Embed a custom controller in the directive,
            controllerAs: 'authCtrl',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();