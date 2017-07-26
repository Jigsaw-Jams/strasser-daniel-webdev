(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, $routeParams, WidgetService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];
        model.createNewWidget = createNewWidget;

        function init() {
        }
        init();

        function createNewWidget(type) {
            var widget = {'widgetType' : type};
            var new_widget = WidgetService.createWidget(model.pid, widget);
            $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + new_widget._id);
        }
    }
})();