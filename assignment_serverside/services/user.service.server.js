var app = require("../../express");
var userModel = require("../model/user/user.model.server");

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];

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

    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.sendStatus(500);
        });
}

// Find a user by their username and password. (authentication for now) or just username
function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user != null) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    } else {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user != null) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            })
    }
}

// Find a user by their associated userId
function findUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            if (user != null) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

// Update the user matching userId with the updated user def
function updateUser(req, res) {
    var userId = req.params.userId;
    var updatedUser = req.body;

    userModel
        .updateUser(userId, updatedUser)
        .then(function (response) {
            if (response.n === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }, function (err) {
            res.sendStatus(404);
        })
}

// Delete the user with the given userId
function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (response) {
            if (response.result.n === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }, function(err) {
            console.log(err);
            res.sendStatus(404);
        });
}