var app = require("../express");

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<div class='alert alert-success'>Lorem ipsum</div>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "I am an h4"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/9bZkp7q19f0" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<div class='alert alert-danger'>Lorem ipsum</div>"}
];


// API Endpoints and their corresponding functions //
app.post(  "/api/v1/page/:pageId/widget", createWidget);
app.get(   "/api/v1/page/:pageId/widget", findWidgetsByPageId);
app.get(   "/api/v1/widget/:widgetId", findWidgetById);
app.put(   "/api/v1/widget/:widgetId", updateWidget);
app.delete("/api/v1/widget/:widgetId", deleteWidget);


function createWidget(req, res) {
    var newWidget = req.body;
    var pageId = req.params.pageId;
    newWidget._id = (new Date()).getTime() + "";
    newWidget.pageId = pageId;
    widgets.push(newWidget);
    res.send(newWidget);
}

function findWidgetsByPageId(req, res) {
    var pageWidgets = [];

    var pageId = req.params.pageId;

    for (var w in widgets) {
        if(widgets[w].pageId === pageId) {
            pageWidgets.push(widgets[w]);
        }
    }

    res.send(pageWidgets);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    for (var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.send(widgets[w]);
            return
        }
    }

    res.sendStatus(404);
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var updatedWidget = req.body;

    for (var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets[w] = updatedWidget;
            res.send(widgets[w]);
        }
    }

    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    for (var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets.splice(w, 1); // remove the wth element from the users array
            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(404);
}