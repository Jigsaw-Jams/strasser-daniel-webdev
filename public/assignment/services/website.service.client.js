(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;

        // --------- FUNCTIONS ---------- //
        /**
         * Adds the website parameter instance to the local websites array. The new website's developerId is set to the userId parameter
         */
        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        /**
         * Retrieves the websites in local websites array whose developerId matches the parameter userId
         */
        function findWebsitesByUser(userId) {
            for (var w in websites) {
                var _website = websites[w];
                if(_website.developerId === userId) {
                    return _website;
                }
            }
            return null;
        }

        /**
         * Retrieves the website in local websites array whose _id matches the websiteId parameter
         */
        function findWebsiteById(websiteId) {
            for (var w in websites) {
                var _website = websites[w];
                if(_website._id === websiteId) {
                    return _website;
                }
            }
            return null;
        }

        /**
         * Updates the website in local websites array whose _id matches the websiteId parameter
         */
        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                var _website = websites[w];
                if(_website._id === websiteId) {
                    _website = website;
                    return _website;
                }
            }
            return null;
        }

        /**
         * Removes the website from local websites array whose _id matches the websiteId parameter
         */
        function deleteWebsite(websiteId) {
            for (var w in websites) {
                var _website = websites[w];
                if(_website._id === websiteId) {
                    websites.splice(w, 1); // remove the wth element from the users array
                }
            }
            return null
        }
    }
})();
