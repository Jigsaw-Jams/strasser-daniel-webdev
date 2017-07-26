(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            model.page = PageService.findPageById(model.pid);
            model.pages = PageService.findPagesByWebsiteId(model.wid);
        }
        init();

        function deletePage(){
            PageService.deletePage(model.pid);
            model.delete = "Page was deleted successfully!";
            $location.url("/user/" + model.userId + "/website/" + model.wid + '/page/');
        }

        function updatePage(page) {
            PageService.updatePage(model.pid, page);
            model.success = "Page was updated successfully!";
            $location.url("/user/" + model.userId + "/website/" + model.wid + '/page/');
        }

    }

})();