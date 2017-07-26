(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

        function LoginController($location, UserService) {
            var model = this;
            model.login = login;

            function init() {}
            init();

            /**
             * If the user authenticates successfully redirect them to their profile, otherwise show the error message.
             */
            function login(user) {
                if (user && user.username && user.password) {
                    _user = UserService.findUserByCredentials(user.username, user.password);
                    if (_user) {
                        $location.url("/user/" + _user._id);
                    }
                    model.errorMessage = "You have entered an incorrect username or password. Please try again.";
                }
            }
        }

})();
