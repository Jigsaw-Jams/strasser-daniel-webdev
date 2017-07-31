(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

        function LoginController($location, $rootScope, UserService) {
            var model = this;
            model.login = login;

            function init() {}
            init();

            /**
             * If the user authenticates successfully redirect them to their profile, otherwise show the error message.
             */
            function login(user) {
                if (user && user.username && user.password) {
                    UserService.findUserByCredentials(user.username, user.password)
                        .then(function (response) {
                            var currentUser = response.data;
                            $rootScope.currentUser = currentUser;
                            $location.url('/user/' + currentUser._id);
                        },    function (rejection) {
                            model.errorMessage = "You have entered an incorrect username or password. Please try again.";
                        });
                }
            }

        }

})();