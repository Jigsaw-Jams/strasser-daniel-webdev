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
            //TODO: split layout?; model.pages = PageService.findPagesByWebsiteId(model.wid);
        }
        init();

        function createPage(page) {
            PageService.createPage(model.wid, page)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/');
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your page was not created. Please try again";
                });
        }

    }

})();