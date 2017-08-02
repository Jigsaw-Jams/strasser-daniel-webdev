(function () {
    angular
        .module("myDirectives", [])
        .directive("widgetList", widgetListDirective); //html doesnt have case sensitive tags  // CAMEL CASE THINGS ARE MAPPED to item-list


    function widgetListDirective($http) {
        function linkFunction(scope, element) {
            //negatives to confirm actions success or failure
            var startIndex = -1;
            var endIndex = -1;

            var ul = element.find("ul");
            ul.sortable({
                start: function(event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function(event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);
                    $http.put("/api/widget/123?start=" + startIndex + "&end=" + endIndex)
                }
            });

        }

        return {
            templateUrl: "../views/widget/templates/widget-list",
            link: linkFunction
        } //each widget should be a directive
    }
})();