var app = require("../express");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "123", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

// API Endpoints and their corresponding functions //
app.post(  "/api/v1/user/:userId/website", createWebsite);
app.get(   "/api/v1/user/:userId/website", findWebsitesByUser);
app.get(   "/api/v1/website/:websiteId", findWebsiteById);
app.put(   "/api/v1/website/:websiteId", updateWebsite);
app.delete("/api/v1/website/:websiteId", deleteWebsite);


function createWebsite(req, res) {
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    return website;
}

function findWebsiteByUser(req, res) {
    var users_websites = [];
    for (var w in websites) {
        var _website = websites[w];
        if(_website.developerId === userId) {
            users_websites.push(_website);
        }
    }
    return users_websites;
}

function findWebsiteById(req, res) {
    for (var w in websites) {
        var _website = websites[w];
        if(_website._id === websiteId) {
            return _website;
        }
    }
    return null;
}

function updateWebsite(req, res) {
    for (var w in websites) {
        var _website = websites[w];
        if(_website._id === websiteId) {
            _website = website;
            return _website;
        }
    }
    return null;
}

function deleteWebsite(req, res) {
    for (var w in websites) {
        var _website = websites[w];
        if(_website._id === websiteId) {
            websites.splice(w, 1); // remove the wth element from the users array
        }
    }
    return null
}