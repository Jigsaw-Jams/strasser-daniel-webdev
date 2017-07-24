(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];


        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };
        return api;

        // --------- FUNCTIONS ---------- //
        /**
         * Adds the page parameter instance to the local pages array. The new page's websiteId is set to the websiteId parameter
         */
        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        /**
         * Retrieves the pages in local pages array whose websiteId matches the parameter websiteId
         */
        function findPageByWebsiteId(websiteId) {
            for (var p in pages) {
                var _page = pages[p];
                if(_page.websiteId === websiteId) {
                    return _page;
                }
            }
            return null;
        }

        /**
         * Retrieves the page in local pages array whose _id matches the pageId parameter
         */
        function findPageById(pageId) {
            for (var p in pages) {
                var _page = pages[p];
                if(_page._id === pageId) {
                    return _page;
                }
            }
            return null;
        }

        /**
         * Updates the page in local pages array whose _id matches the pageId parameter
         */
        function updatePage(pageId, page) {
            for (var p in pages) {
                var _page = pages[p];
                if(_page._id === pageId) {
                    _page = page;
                    return _page;
                }
            }
            return null;
        }

        /**
         * Removes the page from local pages array whose _id matches the pageId parameter
         */
        function deletePage(pageId) {
            for (var p in pages) {
                var _page = pages[p];
                if(_page._id === pageId) {
                    pages.splice(p, 1); // remove the pth element from the users array
                }
            }
            return null;
        }
    }
})();
