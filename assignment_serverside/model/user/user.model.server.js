// Import dependencies and declare the userModel
var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

// Create and export the functions that can be called on this model
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
module.exports = userModel;


// Creates a new user instance
function createUser(user) {
    return userModel.create(user);
}

// Retrieves a user instance whose _id is equal to parameter userId
function findUserById(userId) {
    console.log('find user by id');
    return userModel.findById(userId);
}

// Retrieves a user instance whose username is equal to parameter username
function findUserByUsername(username) {
    console.log('username');
    return userModel.findOne({username: username});
}

// Retrieves a user instance whose username and password are equal to parameters userId and password
function findUserByCredentials(username, password) {
    console.log('credentials');
    return userModel.findOne({username: username, password: password});
}

// Updates user instance whose _id is equal to parameter userId
function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

// Removes user instance whose _id is equal to parameter userId
function deleteUser(userId) {
    return userModel.remove({_id: userId});
}