(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];

        function init() {
            model.page = PageService.findPageById(model.pid);
            model.pages = PageService.findPagesByWebsiteId(model.wid);
        }
        init();

    }

})();