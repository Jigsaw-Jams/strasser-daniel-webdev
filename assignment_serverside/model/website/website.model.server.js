// Import dependencies and declare the websiteModel
var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("../user/user.model.server");

// Create and export the functions that can be called on this model
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;
module.exports = websiteModel;


// Creates a new website instance for user whose _id is userId
function createWebsiteForUser(userId, website) {
    // set the back reference to the user who created the website
    website._user = userId;
    var returnWebsite = null;

    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            returnWebsite = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function (userDoc) {
           return returnWebsite;
        });
}

// Retrieves all website instances for user whose  _id is userId
function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId});
        //.populate("_user", "username")
        //.exec();
}

// Retrieves single website instance whose _id is websiteId
function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

// Updates website instance whose _id is websiteId
function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

// Removes website instance whose _id is websiteId
function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
}

// remove pages from belonging to this website
function removePage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            // remove the page from the pages reference array
            website.pages.splice(index, 1);
            return website.save();
        })
}

// add pages belonging to this website
function addPage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            // add the page to the pages reference array
            website.pages.push(pageId);
            return website.save();
        });
}