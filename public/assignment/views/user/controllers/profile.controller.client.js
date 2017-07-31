(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $rootScope, $location, UserService) {
        var model = this;
        model.user = $rootScope.currentUser;
        model.userId = $routeParams["userId"];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            // This should eventually be removed, if currentUser doesn't exist (or whatever persistent session management system we use) then this page shouldnt display at all . TODO
            if (model.user == null) {
                UserService.findUserById(model.userId)
                    .then(function (response) {
                        $rootScope.currentUser = response.data;
                        model.user = response.data;
                    })
            }
        }
        init();

        /**
         * If the profile is updated successfully then show the success message, otherwise the error message.
         */
        function updateUser(user) {
            UserService.updateUser(model.userId, user)
                .then(function (response) {
                    var updatedUser = response.data;
                    $rootScope.currentUser = updatedUser;
                    model.successMessage = "Profile Updated Successfully!";
                },    function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your profile was not updated. Please try again";
                });
        }

        /**
         * Delete the User from this profile page
         */
        function deleteUser() {
            UserService.deleteUser(model.userId)
                .then(function (response) {
                    if (response.status == 200) {
                        $location.url('/login');
                    }
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your profile was not deleted. Please try again";
                    }
                )
        }

    }

})();