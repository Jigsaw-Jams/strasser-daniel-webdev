(function() {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.createPage = createPage;

        function init() {
            model.pages = PageService.findPagesByWebsiteId(model.wid);
        }
        init();

        function createPage(page) {
            var p = PageService.createPage(model.wid, page);
            $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/');
        }

    }

})();