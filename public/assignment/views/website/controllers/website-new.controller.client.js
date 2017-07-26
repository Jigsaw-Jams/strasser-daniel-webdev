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
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(website) {
            console.log(website);
            WebsiteService.createWebsite(model.userId, website);
            $location.url('/user/' + model.userId + '/website');
        }
    }

})();