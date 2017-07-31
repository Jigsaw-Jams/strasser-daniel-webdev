(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, $rootScope, UserService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.registerUser = registerUser;


        function init() {}
        init();

        function registerUser(user) {
            UserService.findUserByUsername(user.username)
                .then(function (response) { // user was found =  username is taken
                    model.errorMessage = "Sorry this username is taken, try again.";
                }, function (rejection) {   // user not found, ok to create new user with this username
                    if (user.password != user.password2) {
                        model.errorMessage = "Sorry the passwords do not match up, try again";
                    } else {
                        delete user['password2']; //  remove the duplicate password field before inserting object
                        UserService.createUser(user)
                            .then(function (response) { // success, user created and logged in as currentUser
                                var newUser = response.data;
                                $rootScope.currentUser = newUser;
                                $location.url('/user/' + newUser._id);
                            }, function (rejection) { // some issue with creating user
                                model.errorMessage = "Sorry, we encountered an error on our end. Please try again in a moment.";
                            });
                    }
                });
        }
    }
})();