(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("widgetList", widgetListDirective); //html doesn't have case sensitive tags  // CAMEL CASE THINGS ARE MAPPED to item-list


    function widgetListDirective($http, $routeParams, WidgetService) {
        var pid = $routeParams['pid'];

        function linkFunction(scope, element) {
            console.log(element);

            //negatives to confirm actions success or failure
            var initialIndex = -1;
            var finalIndex = -1;

            var widgetList = element.find('div');

            widgetList.sortable({
                start: function(event, ui) {
                    $('#sortme').height($('#sortme').height());
                    initialIndex = $(ui.item).index();
                    $(ui.item).addClass("panel-info");
                },
                stop: function(event, ui) {
                    finalIndex = $(ui.item).index();
                    $(ui.item).removeClass("panel-info");

                    WidgetService.reorderWidget(pid, initialIndex, finalIndex)
                        .then(function (response){})

                }
            });
        }

        return {
            templateUrl: "views/widget/templates/widget-list.directive.client.html",
            link: linkFunction
        }
    }
})();