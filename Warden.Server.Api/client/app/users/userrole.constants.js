﻿(function () {
    'use strict';

    angular
        .module('app')
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            editor: 'editor',
            guest: 'guest'
        })
})();