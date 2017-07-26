(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService, WebsiteService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];

        function init() {
            model.website = WebsiteService.findWebsiteById(model.wid);
            model.pages = PageService.findPagesByWebsiteId(model.wid);
        }
        init();

    }

})();