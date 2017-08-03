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
                    initialIndex = $(ui.item).index();
                },
                stop: function(event, ui) {
                    finalIndex = $(ui.item).index();

                    console.log([initialIndex, finalIndex]);

                    WidgetService.reorderWidget(pid, initialIndex, finalIndex)
                        .then(function (response){
                            console.log('yay');
                            console.log(response);
                        })

                }
            });

        }

        return {
            templateUrl: "views/widget/templates/widget-list.directive.client.html",
            link: linkFunction
        }
    }
})();