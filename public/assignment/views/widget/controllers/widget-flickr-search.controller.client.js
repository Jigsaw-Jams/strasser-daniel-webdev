(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            // When updating the widget, the model needs to know which widget to update.
            WidgetService.findWidgetById(model.wgid)
                .then(function (response) {
                    model.widget = response.data;
                });
        }
        init();


        // Ask the FlickrService to return json containing a list of photos matching searchText
        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (data) {
                    model.photos = data.photos;
                    console.log(model.photos);
                });
        }

        // When a particular thumbnail photo is selected, set the full size image url as the url for the current widget
        function selectPhoto(photo) {
            console.log(photo);
            // Build the full image url
            var url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
            console.log(url);
            model.widget.url = url;

            WidgetService
                .updateWidget(model.wgid, model.widget)
                .then( function (response) {
                    model.successMessage = "The photo widget was updated to use this photo. You may continue changing the photo, or return back to the widget edit page now.";
                    //$location.url('/user/' + model.userId + '/website/' + model.wid + '/page/' + model.pid + '/widget/'+ model.wgid);
                }, function (err) {
                    model.errorMessage = "The photo could not be updated. Please try again.";
                });

        }

    }

})();