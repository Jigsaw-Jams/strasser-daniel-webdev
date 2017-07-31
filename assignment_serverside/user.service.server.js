var app = require("../express");

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

// API Endpoints and their corresponding functions //
// app.get("/api/v1/user", findUserByUsername); This is in the assignment spec, but can't actually exist...
app.post(  "/api/v1/user", createUser);
app.get(   "/api/v1/user", findUserByCredentials);
app.get(   "/api/v1/user/:userId", findUserById);
app.put(   "/api/v1/user/:userId", updateUser);
app.delete("/api/v1/user/:userId", deleteUser);


// create a new user
function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);
}

// Find a user by their username and password. (authentication for now)
function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        for (var u in users) {
            if (users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
    } else {
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
    }
    res.sendStatus(404);
}

// Find a user by their associated userId
function findUserById(req, res) {
    var userId = req.params.userId;

    for (var u in users) {
        if(users[u]._id === userId) {
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

// Update the user matching userId with the updated user def
function updateUser(req, res) {
    var userId = req.params.userId;
    var updatedUser = req.body;

    for (var u in users) {
        if(users[u]._id === userId) {
            users[u] = updatedUser;
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

// Delete the user with the given userId
function deleteUser(req, res) {
    var userId = req.params.userId;

    for (var u in users) {
        if(users[u]._id === userId) {
            users.splice(u, 1);  // remove the uth element from the users array
            res.sendStatus(200); // user was successfully deleted
            return;
        }
    }
    res.sendStatus(404);
}