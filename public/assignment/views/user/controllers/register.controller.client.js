(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.registerUser = registerUser;


        function init() {
        }
        init();

        function registerUser(user) {
            if (UserService.findUserByUsername(user.username)){
                model.errorMessage = "Sorry this username is taken, try again.";
            }
            // basic 8 char requirement
            else if (user.password.length < 8) {
                model.errorMessage = "Password must be at least 8 characters long, try again.";
            }
            else if (user.password != user.password2) {
                model.errorMessage = "Sorry the passwords do not match up, try again";
            } else {
                delete user['password2'];
                var new_user = UserService.createUser(user);
                console.log('user created');
                $location.url('/user/' + new_user._id);
            }
        }
    }

})();