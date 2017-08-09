(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        if (process.env.FLICKR_API_KEY) {
            var key = process.env.FLICKR_API_KEY;
        } else {
            // I want to remove this but it seems like there is no good way if I need it on the client.
            // I could have an additonal api method that returns this key, but the client still gets the key at some point.
            var key = '6c0f5b2a4579a402fcb7523e2460256b';
        };

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
