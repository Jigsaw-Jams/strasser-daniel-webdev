var app = require("../../express");
var websiteModel = require("../model/website/website.model.server");

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
    console.log('creating site');
    var newWebsite = req.body;
    var userId = req.params.userId;

    websiteModel
        .createWebsiteForUser(userId, newWebsite)
        .then(function (website) {
            res.send(website);
        }, function (err) {
            res.sendStatus(500);
        });
}

function findWebsitesByUser(req, res) {
    console.log('finding all sites');
    var userId = req.params.userId;

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.send(websites);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findWebsiteById(req, res) {
    console.log('finding one site');
    var websiteId = req.params.websiteId;

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.send(website);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateWebsite(req, res) {
    var updatedWebsite = req.body;
    var websiteId = req.params.websiteId;
    console.log('updating site');

    websiteModel
        .updateWebsite(websiteId, updatedWebsite)
        .then(function (website) {
            res.send(website);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteWebsite(req, res) {
    console.log('deleting website');
    var websiteId = req.params.websiteId;

    websiteModel
        .deleteWebsite(websiteId)
        .then(function (hmm) {
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
            res.sendStatus(404);
        })
}