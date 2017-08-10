// Import dependencies and declare the widgetModel
var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require('../page/page.model.server');


// Create and export the functions that can be called on this model
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;


function createWidget(pageId, widget) {
    widget._page = pageId;
    var returnWidget = null;


    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            returnWidget = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc._id)
        })
        .then(function (pageDoc) {
            return returnWidget;
        });
}

function findAllWidgetsForPage(pageId) {
    //return widgetModel.find({_page: pageId});
    return pageModel
        .findById(pageId)
        .populate("widgets")
        .then(function (page) {
            return page.widgets;
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function  deleteWidget(pageId, widgetId) {
    console.log('pageid del: ', pageId);
    console.log('widgid del: ', widgetId);
    return widgetModel
        .remove({_id: widgetId})
        .then(function () {
            return pageModel.removeWidget(pageId, widgetId)
        });
}

function reorderWidget(pageId, initial, final) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var currentWidget = page.widgets[initial];
            // remove widget from array
            page.widgets.splice(initial, 1);
            // replace in new location
            page.widgets.splice(final, 0, currentWidget);
            return page.save();
        });

}