(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.createWebsite = createWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();

        function createWebsite(website) {
            WebsiteService.createWebsite(model.userId, website)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website');
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your website was not created. Please try again";
                });
        }
    }

})();