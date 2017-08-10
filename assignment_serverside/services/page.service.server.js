var app = require("../../express");
var pageModel = require("../model/page/page.model.server");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Zorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Scorem" }
];

// API Endpoints and their corresponding functions //
app.post(  "/api/v1/website/:websiteId/page", createPage);
app.get(   "/api/v1/website/:websiteId/page", findPagesByWebsiteId);
app.get(   "/api/v1/page/:pageId", findPageById);
app.put(   "/api/v1/page/:pageId", updatePage);
app.delete("/api/v1/page/:pageId", deletePage);


function createPage (req, res) {
    var newPage = req.body;
    var websiteId = req.params.websiteId;
    console.log('creating page');

    pageModel
        .createPage(websiteId, newPage)
        .then(function (page) {
            res.send(page);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findPagesByWebsiteId (req, res) {
    var websiteId = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.send(pages);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findPageById (req, res) {
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.send(page);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updatePage (req, res) {
    var updatedPage = req.body;
    var pageId = req.params.pageId;

    pageModel
        .updatePage(pageId, updatedPage)
        .then(function (page) {
            res.send(page);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deletePage (req, res) {
    var pageId = req.params.pageId;

    console.log('del page');

    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}