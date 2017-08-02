(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];

        function init() {
            // model.websites = WebsiteService.findWebsitesByUser(model.userId);
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                })
        }
        init();
    }
})();