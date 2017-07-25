(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var model = this;
        model.userId = $routeParams["userId"];

        function init() {
            model.user = UserService.findUserById(model.userId);
        }
        init();

    }

})();