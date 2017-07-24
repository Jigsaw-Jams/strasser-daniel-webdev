(function() {
    angular
        .module("WebAppMaker") // .module returns the instance of the original module
        .config(configuration); // This is called chaining (apparently a common interview question)

    function configuration($routeProvider) {
        $routeProvider
            // -------- User --------
            .when("/login", {
                templateUrl : "views/user/login.view.client.html"
            })
            .when("/", {
                templateUrl : "views/user/login.view.client.html"
            })
            .when("/default", {
                templateUrl : "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl : "views/user/register.view.client.html"
            })
            .when("/user/:userId", {
                templateUrl : "views/user/profile.view.client.html"
            })
            // -------- Website --------
            .when("/user/:userId/website", {
                templateUrl : "views/website/website-list.view.client.html"
            })
            .when("/user/:userId/website/new", {
                templateUrl : "views/website/website-new.view.client.html"
            })
            .when("/user/:userId/website/:wid", {
                templateUrl : "views/website/website-edit.view.client.html"
            })
            // -------- Page --------
            .when("/user/:userId/website/:wid/page", {
                templateUrl : "views/page/templates/page-list.view.client.html"
            })
            .when("/user/:userId/website/:wid/page/new", {
                templateUrl : "views/page/templates/page-new.view.client.html"
            })
            .when("/user/:userId/website/:wid/page/:pid", {
                templateUrl : "views/page/templates/page-edit.view.client.html"
            })
            // -------- Widget --------
            .when("/user/:userId/website/:wid/page/:pid/widget", {
                templateUrl : "views/page/widget-list.view.client.html"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                templateUrl : "views/page/widget-choose.view.client.html"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/:wgid", {
                templateUrl : "views/page/widget-edit.view.client.html"
            })
    }
})();