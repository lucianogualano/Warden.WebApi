!function() {
    "use strict";
    function a(a, b, c) {
        a.$on("$routeChangeStart", function(a, d, e) {
            d.authorize === !0 && (c.authentication.isAuthenticated || b.path("/"));
        }), a.$on("$routeChangeError", function(a, c, d, e) {
            e instanceof AuthorizationError && b.path("/login").search("returnTo", c.originalPath);
        }), $(document).ready(function() {
            $("[data-toggle=offcanvas]").click(function() {
                $(".row-offcanvas").toggleClass("active");
            });
        });
    }
    function b(a, b, c, d) {
        a.when("/", {
            templateUrl: "/pages/home.html",
            controller: "HomeController",
            controllerAs: "homeCtrl"
        }).when("/about", {
            templateUrl: "/pages/about.html"
        }).when("/contact", {
            templateUrl: "/pages/contact.html"
        }).when("/sites", {
            templateUrl: "/pages/sites.html",
            controller: "SiteQueryController",
            controllerAs: "siteQueryController"
        }).when("/dashboard", {
            templateUrl: "/pages/dashboard.html",
            controller: "DashboardController",
            controllerAs: "dashboardController",
            authorize: !0
        }).otherwise({
            redirectTo: "/"
        }), b.html5Mode(!0), c.debugEnabled(!0), d.setDefaults({
            className: "ngdialog-theme-default",
            plain: !1,
            showClose: !0,
            closeByDocument: !0,
            closeByEscape: !0,
            appendTo: !1
        });
    }
    b.$inject = [ "$routeProvider", "$locationProvider", "$logProvider", "ngDialogProvider" ], 
    a.$inject = [ "$rootScope", "$location", "authService" ];
    var c = angular.module("app", [ "ngRoute", "ngResource", "ui.grid", "ui.grid.edit", "ngDialog", "LocalStorageModule", "ngMap" ]);
    c.config(b), c.run(a);
}(), function() {
    "use strict";
    function a(a, b, c, d, e, f) {
        function g(d, e, g) {
            var h = "00000000-0000-0000-0000-000000000000";
            f.register(h, d, e, g).then(function(d) {
                c.debug("Signed up user " + j.username + " status is " + d.status), j.hasAuthenticationError = !1, 
                a.path("/dashboard"), b.closeAll();
            }, function(a) {
                c.error("Registration failed " + a.status), j.hasAuthenticationError = !0;
            });
        }
        function h(d, g) {
            var h = "00000000-0000-0000-0000-000000000000";
            f.login(h, d, g).then(function(f) {
                return c.debug("Logged in user " + d + " status is " + f.status), j.hasAuthenticationError = !1, 
                200 != f.status ? (e.displayError("Authenication failed."), void (j.hasAuthenticationError = !0)) : (a.path("/dashboard"), 
                void b.closeAll());
            });
        }
        function i() {
            f.logout(), a.path("/");
        }
        var j = this;
        j.title = "registerController", c.debug("Just started register controller!"), j.username = null, 
        j.email = null, j.password = null, j.errorMessage = null, j.hasAuthenticationError = !1, 
        j.isUserLoggedIn = function() {
            return f.authentication.isAuthenticated;
        }, j.signup = function() {
            g(j.username, j.email, j.password);
        }, j.login = function() {
            h(j.email, j.password);
        }, j.logout = function() {
            i();
        }, j.loginUser = function() {
            b.open({
                template: "pages/login.html",
                plain: !1,
                className: "ngdialog-theme-default",
                scope: d,
                controller: "AuthenticaitonCtrl",
                controllerAs: "vm"
            });
        }, j.showsignup = function() {
            b.open({
                template: "pages/signup.html",
                plain: !1,
                className: "ngdialog-theme-default",
                scope: d,
                controller: "AuthenticaitonCtrl",
                controllerAs: "vm"
            });
        };
    }
    angular.module("app").controller("AuthenticaitonCtrl", a), a.$inject = [ "$location", "ngDialog", "$log", "$scope", "notificationService", "authService" ];
}(), function() {
    "use strict";
    function a(a, b, c, d) {
        function e(c, d, e, f) {
            return b.debug("Register user name " + e), a.post(k + "register", {
                Id: c,
                UserName: d,
                Email: e,
                Password: f
            }).then(function(a) {
                return i(e, f), b.debug("Response status is " + a.status), a;
            }, function(a) {
                return b.debug("Failed sign up of user name " + e), factory.logout(), a;
            });
        }
        function f(a) {
            b.debug("Registration failed");
        }
        function g(c, d, e) {
            return b.debug("Login with email" + d), a.post(k + "login", {
                Id: c,
                Email: d,
                Password: e
            }).then(function(a) {
                return b.debug("Response status is " + a.status), i(d, e), a;
            }, function(a) {
                return b.debug("Failed sign up of user name " + d), factory.logout(), a;
            });
        }
        function h() {
            j();
        }
        function i(a, b) {
            c.set("authorizationData", {
                Email: a
            }), factory.authentication.isAuthenticated = !0, factory.authentication.email = a, 
            factory.authentication.roles = d.all;
        }
        function j() {
            c.remove("authorizationData"), factory.authentication.isAuthenticated = !1, factory.authentication.email = "", 
            factory.authentication.roles = "";
        }
        var k = "/api/account/", l = {
            loginPath: "/register",
            authentication: {
                isAuthenticated: !1,
                email: "",
                roles: null
            },
            register: e,
            registrationFailed: f,
            login: g,
            logout: h
        };
        return l;
    }
    angular.module("app").factory("authService", a), a.$inject = [ "$http", "$log", "localStorageService", "USER_ROLES" ];
}(), function() {
    "use strict";
    function a(a, b, c, d) {
        function e(e, f, g) {
            var i = "00000000-0000-0000-0000-000000000000";
            d.login(i, e, f, g).then(function(d) {
                return c.debug("Signed up user " + h.username + " status is " + d.status), 200 != d.status ? void (h.errorMessage = d.data.UserName[0]) : (a.path("/dashboard"), 
                void b.closeAll());
            });
        }
        function f() {
            c.debug("Login user");
        }
        function g(a, b, c) {
            e(h.username, h.email, h.password);
        }
        var h = this;
        c.debug("Just started home controller!"), h.signup = g, h.login = f, h.username = null, 
        h.email = null, h.password = null, h.errorMessage = null, h.title = "Home";
    }
    angular.module("app").controller("HomeController", a), a.$inject = [ "$location", "ngDialog", "$log", "authService" ];
}(), function() {
    "use strict";
    function a() {
        function a(a) {
            toastr.success(a);
        }
        function b(a) {
            Array.isArray(a) ? a.forEach(function(a) {
                toastr.error(a);
            }) : toastr.error(a);
        }
        function c(a) {
            toastr.warning(a);
        }
        function d(a) {
            toastr.info(a);
        }
        toastr.options = {
            debug: !1,
            positionClass: "toast-top-right",
            onclick: null,
            fadeIn: 300,
            fadeOut: 1e3,
            timeOut: 3e3,
            extendedTimeOut: 1e3
        };
        var e = {
            displaySuccess: a,
            displayError: b,
            displayWarning: c,
            displayInfo: d
        };
        return e;
    }
    angular.module("app").factory("notificationService", a);
}(), function() {
    "use strict";
    function a() {
        function a(a, b, c) {}
        var b = {
            link: a,
            restrict: "A",
            templateUrl: "pages/navbar.html",
            controller: "AuthenticaitonCtrl",
            controllerAs: "authCtrl",
            scope: !0
        };
        return b;
    }
    angular.module("app").directive("wardenNavbar", a);
}(), function() {
    "use strict";
    angular.module("app").constant("USER_ROLES", {
        all: "*",
        admin: "admin",
        editor: "editor",
        guest: "guest"
    });
}();