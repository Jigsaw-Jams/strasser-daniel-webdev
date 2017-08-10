// Import dependencies and declare the pageModel
var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require('../website/website.model.server');


// Create and export the functions that can be called on this model
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.removeWidget = removeWidget;
pageModel.addWidget = addWidget;
module.exports = pageModel;


// Create a new page
function createPage(websiteId, page) {
    page._website = websiteId;
    var returnPage = null;

    return pageModel
        .create(page)
        .then(function (pageDoc) {
            returnPage = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc._id);
        })
        .then(function (websiteDoc) {
            return returnPage;
        });
}

// Find all pages that belong to websiteId
function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

// find a specific page by id
function findPageById(pageId) {
    return pageModel
        .findById(pageId)
        .populate('widgets')
        .exec();
}

// update the page matching pageId
function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

// delete the page matching pageId
function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}

// remove widget from belonging to this page
function removeWidget(pageId, widgetId) {
    console.log('pageid: ', pageId);
    console.log('widgetId: ', widgetId);

    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            console.log(page);
            var index = page.widgets.indexOf(widgetId);
            console.log('index to remove:', index);
            // remove the widget from the widgets reference array
            page.widgets.splice(index, 1);
            return page.save();
        });
}

// add widget belonging to this page
function addWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            // add the widget to the widgets reference array
            page.widgets.push(widgetId);
            return page.save();
        });
}
