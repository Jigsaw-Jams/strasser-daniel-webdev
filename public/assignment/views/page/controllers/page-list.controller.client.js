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
            WebsiteService.findWebsiteById(model.wid)
                .then(function (response) {
                    model.website = response.data;
                });
            PageService.findPagesByWebsiteId(model.wid)
                .then(function  (response) {
                    model.pages = response.data;
                })
        }
        init();

    }

})();