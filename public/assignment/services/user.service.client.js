(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        // --------- FUNCTIONS ---------- //
        /**
         * Adds the user parameter instance to the local users array
         */
        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        /**
         *  Returns the user in local users array whose _id matches the userId parameter
         */
        function findUserById(userId) {
            for (var u in users) {
                var _user = users[u];
                if(_user._id === userId) {
                    return _user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users) {
                var _user = users[u];
                if(_user.username === username) {
                    return _user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var _user = users[u];
                if(_user.username === username && _user.password === password) {
                    return _user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                var _user = users[u];
                if(_user._id === userId) {
                    _user = user; // set the outdated user to the definition of the updated user
                    return _user
                }
            }
            return null
        }

        /**
         * Removes the user whose _id matches the userId parameter
         */
        function deleteUser(userId) {
            for (var u in users) {
                var _user = users[u];
                if(_user._id === userId) {
                    users.splice(u, 1); // remove the uth element from the users array
                }
            }
            return null
        }


    }
})();
