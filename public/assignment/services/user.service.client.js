(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser"   : createUser,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "findUserById" : findUserById,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        function createUser(user) {
            var url = "/api/v1/user";
            return $http.post(url, user); // pass in user def as the request body
        }

        function findUserByUsername(username) {
            var url = "/api/v1/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/v1/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/v1/user/" + userId;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/v1/user/" + userId;
            return $http.put(url, user);       // pass in user def as the request body
        }

        function deleteUser(userId) {
            var url = "/api/v1/user/" + userId;
            return $http.delete(url);
        }
    }
})();