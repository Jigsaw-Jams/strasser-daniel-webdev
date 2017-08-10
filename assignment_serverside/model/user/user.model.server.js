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
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
module.exports = userModel;


// Creates a new user instance
function createUser(user) {
    return userModel.create(user);
}

// Retrieves a user instance whose _id is equal to parameter userId
function findUserById(userId) {
    return userModel
        .findById(userId)
        .populate('websites', 'name')
        .exec(); // populate the websites array with only the name of the website
}

// Retrieves a user instance whose username is equal to parameter username
function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

// Retrieves a user instance whose username and password are equal to parameters userId and password
function findUserByCredentials(username, password) {
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

// remove websites from belonging to this user
function removeWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            // remove the website from the websites reference array
            user.websites.splice(index, 1);
            return user.save();
        })
}

// add website belonging to this user
function addWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            // add the website to the websites reference array
            user.websites.push(websiteId);
            return user.save();
        });
}