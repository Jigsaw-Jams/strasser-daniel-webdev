(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];

        function init() {
            model.website = WebsiteService.findWebsiteById(model.wid);
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

    }

})();