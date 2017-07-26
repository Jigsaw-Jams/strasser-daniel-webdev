(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.updateUser = updateUser;

        function init() {
            model.user = UserService.findUserById(model.userId);
        }
        init();

        function updateUser(user) {
            console.log(user);
            UserService.updateUser(model.userId, user);
            model.success = "Profile Updated Successfully!";
        }

    }

})();