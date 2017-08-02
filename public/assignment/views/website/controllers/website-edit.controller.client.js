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
            WebsiteService.findWebsiteById(model.wid)
                .then(function (response) {
                    model.website = response.data;
                });
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(model.wid, website)
                .then(function (response) {
                    console.log('og tb');
                    console.log(model.userId);
                    console.log(model.wid);
                    $location.url("/user/" + model.userId + "/website/");
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your website was not updated. Please try again";
                });
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.wid)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/");
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your website was not deleted. Please try again";
                });
        }
    }

})();