(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;

        // --------- FUNCTIONS ---------- //
        function createWebsite(userId, website) {
            var url = "/api/v1/user/" + userId + "/website";
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/v1/user/" + userId + "/website";
            return $http.get(url)
        }

        function findWebsiteById(websiteId) {
            var url = "/api/v1/website/" + websiteId;
            return $http.get(url);
        }


        function updateWebsite(websiteId, website) {
            var url = 'test';
        }


        function deleteWebsite(websiteId) {

        }
    }
})();
