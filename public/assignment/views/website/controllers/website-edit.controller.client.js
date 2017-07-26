(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;


        function init() {
            model.website = WebsiteService.findWebsiteById(model.wid);
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

        /**
         * Update the current website to match the definition of @website
         */
        function updateWebsite(website) {
            WebsiteService.updateWebsite(model.wid, website);
            $location.url("/user/" + model.userId + "/website/" + model.wid);
        }

        /**
         * Delete the current website.
         */
        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.wid);
            $location.url("/user/" + model.userId + "/website/");
        }
    }

})();