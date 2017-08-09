var app = require("../../express");

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
    newPage._id = (new Date()).getTime() + "";
    newPage.websiteId = websiteId;
    pages.push(newPage);
    res.send(newPage)
}

function findPagesByWebsiteId (req, res) {
    var websitePages = [];
    var websiteId = req.params.websiteId;

    for (var p in pages) {
        if(pages[p].websiteId === websiteId) {
            websitePages.push(pages[p]);
        }
    }
    res.send(websitePages);
}

function findPageById (req, res) {
    var pageId = req.params.pageId;

    for (var p in pages) {
        if(pages[p]._id === pageId) {
            res.send(pages[p]);
            return;
        }
    }

    res.sendStatus(404);
}

function updatePage (req, res) {
    var updatedPage = req.body;
    var pageId = req.params.pageId;

    for (var p in pages) {
        if(pages[p]._id === pageId) {
            pages[p] = updatedPage;
            res.send(pages[p]);
            return;
        }
    }

    res.sendStatus(404);
}

function deletePage (req, res) {
    var pageId = req.params.pageId;

    for (var p in pages) {
        if(pages[p]._id === pageId) {
            pages.splice(p, 1); // remove the pth element from the users array
            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(404);
}