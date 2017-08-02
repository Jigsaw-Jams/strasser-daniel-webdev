(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("widgetList", widgetListDirective); //html doesnt have case sensitive tags  // CAMEL CASE THINGS ARE MAPPED to item-list


    console.log('zzzz');
    function widgetListDirective($http) {
        function linkFunction(scope, element) {
            console.log(element);

            //negatives to confirm actions success or failure
            var startIndex = -1;
            var endIndex = -1;

            var widgetList = element.find('ul');

            widgetList.sortable({
                start: function(event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function(event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);
                    //$http.put("/api/widget/123?start=" + startIndex + "&end=" + endIndex)
                }
            });

        }

        return {
            templateUrl: "views/widget/templates/widget-list.directive.client.html",
            link: linkFunction
        }
    }
})();