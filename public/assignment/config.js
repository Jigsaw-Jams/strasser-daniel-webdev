(function() {
    angular
        .module("WebAppMaker") // .module returns the instance of the original module
        .config(configuration); // This is called chaining (apparently a common interview question)

    function configuration($routeProvider) {
        $routeProvider
            // -------- User --------
            .when("/login", {
                templateUrl : "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl : "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/default", {
                templateUrl : "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl : "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl : "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            // -------- Website --------
            .when("/user/:userId/website", {
                templateUrl : "views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl : "views/website/templates/website-new.view.client.html",
                controller: "WebsiteNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid", {
                templateUrl : "views/website/templates/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            // -------- Page --------
            .when("/user/:userId/website/:wid/page", {
                templateUrl : "views/page/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/new", {
                templateUrl : "views/page/templates/page-new.view.client.html",
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/:pid", {
                templateUrl : "views/page/templates/page-edit.view.client.html",
                controller: "PageEditController",
                controllerAs: "model"
            })

            // -------- Widget --------
            .when("/user/:userId/website/:wid/page/:pid/widget", {
                templateUrl : "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                templateUrl : "views/widget/templates/widget-choose.view.client.html",
                controller: "WidgetNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/:wgid", {
                templateUrl : "views/widget/templates/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid/page/:pid/widget/:wgid/flickr_search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model'
            })
    }
})();