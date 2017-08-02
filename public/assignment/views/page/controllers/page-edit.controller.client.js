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


            PageService.findPageById(model.pid)
                .then(function (response) {
                    model.page = response.data;
                });
            PageService.findPagesByWebsiteId(model.wid)
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();

        function deletePage(){
            PageService.deletePage(model.pid)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + '/page/');
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your page was not deleted. Please try again";
                });
        }

        function updatePage(page) {
            PageService.updatePage(model.pid, page)
                .then(function (response) {
                    model.successMessage = "Page was updated successfully!";
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your page was not updated. Please try again";
                });
        }

    }

})();