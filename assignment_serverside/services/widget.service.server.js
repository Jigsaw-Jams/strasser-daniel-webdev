var app = require("../../express");
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../public/uploads' });
var widgetModel = require("../model/widget/widget.model.server");

// API Endpoints and their corresponding functions //
app.post(  "/api/v1/page/:pageId/widget", createWidget);
app.get(   "/api/v1/page/:pageId/widget", findWidgetsByPageId);
app.get(   "/api/v1/widget/:widgetId",    findWidgetById);
app.put(   "/api/v1/widget/:widgetId",    updateWidget);
app.delete( "/api/v1/page/:pageId/widget/:widgetId",    deleteWidget);
app.put(   "/api/v1/page/:pageId/widget", reorderWidget);
app.post(  "/api/v1/upload", upload.single('myFile'), uploadFile);


function createWidget(req, res) {
    var newWidget = req.body;
    var pageId = req.params.pageId;


    widgetModel
        .createWidget(pageId, newWidget)
        .then(function (widget) {
            res.send(widget);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.send(widgets);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;


    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.send(widget);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var updatedWidget = req.body;

    widgetModel
        .updateWidget(widgetId, updatedWidget)
        .then(function (widget) {
            res.send(widget);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;

    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function reorderWidget(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;


    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });

}


function getWidgetById(widgetId) {
    for (var w in widgets) {
        if(widgets[w]._id === widgetId) {
            return widgets[w];
        }
    }
    return null;
}


function uploadFile(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget     = getWidgetById(widgetId);
    widget.url = "/uploads/" + filename;

    var callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    res.redirect(callbackUrl);
}

