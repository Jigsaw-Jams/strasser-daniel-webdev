(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var key = process.env.FLICKR_API_KEY;
        var secret = process.env.FLICKR_API_SECRET;

        var api = {
            "searchPhotos" : searchPhotos
        };
        return api;


        // --------- FUNCTIONS ---------- //

        // Return a promise containing which, when resolved, should contain JSON with a list of photos matching searchText
        function searchPhotos(searchText) {
            var searchUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=${key}&text=${searchText}`;
            return $http.get(searchUrl)
                .then(function (response) {
                    // Remove extraneous text from JSON response and return parsed JSON
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    return JSON.parse(data);
                });
        }
    }
})();
