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
    var newWebsite = req.body;
    var userId = req.params.userId;
    newWebsite._id = (new Date()).getTime() + "";
    newWebsite.developerId = userId;
    websites.push(newWebsite);
    res.send(newWebsite);
}

function findWebsitesByUser(req, res) {
    var userWebsites = [];
    var userId = req.params.userId;

    for (var w in websites) {
        if(websites[w].developerId === userId) {
            userWebsites.push(websites[w]);
        }
    }

    res.send(userWebsites);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    for (var w in websites) {
        if(websites[w]._id === websiteId) {
            res.send(websites[w]);
            return;
        }
    }

    res.sendStatus(404);
}

function updateWebsite(req, res) {
    console.log('call recvd');
    var updatedWebsite = req.body;
    console.log(updatedWebsite);
    var websiteId = req.params.websiteId;

    for (var w in websites) {
        if(websites[w]._id === websiteId) {
            console.log('match found');
            websites[w] = updatedWebsite;
            console.log(websites[w]);
            res.send(websites[w]);
            return;
        }
    }

    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    console.log('call recvd');
    var websiteId = req.params.websiteId;

    for (var w in websites) {
        if(websites[w]._id === websiteId) {
            websites.splice(w, 1); // remove the wth element from the users array
            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(404);
}