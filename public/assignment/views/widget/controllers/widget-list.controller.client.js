(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];
        model.trustUrlResource = trustUrlResource;
        model.trustHtmlContent = trustHtmlContent;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;

        function init() {
            WidgetService.findWidgetsByPageId(model.pid)
                .then(function (response) {
                    model.widgets = response.data;
                })
        }
        init();

        /**
         * Is this url safe to display within an iframe? If so return the safe embeddable youtube url
         */
        function trustUrlResource(url) {
            var youtubeEmbedUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            // get just the unique video identifier and append it to the embed url
            youtubeEmbedUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeEmbedUrl);
        }

        /**
         * Is this html content safe? If so return the content back to the view
         */
        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        /**
         * Create the url/path to the appropriate widget html based on widgetType (to be used by ng-include)
         */
        function getWidgetIncludeUrl(widgetType) {
            return "./views/widget/templates/widget-" + widgetType.toLowerCase() + ".view.client.html";
        }
    }

})();