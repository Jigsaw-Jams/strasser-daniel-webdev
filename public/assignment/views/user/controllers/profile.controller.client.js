(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location) {
        var model = this;
        var model.userId = $routeParams["userId"];



    }

})();