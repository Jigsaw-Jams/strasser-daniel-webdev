(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];
        model.updateWidget = updateWidget;
        model.deleteWidget= deleteWidget;

        function init() {
            model.widget = WidgetService.findWidgetById(model.wgid);
        }
        init();

        function updateWidget (widget) {
            _widget = WidgetService.findWidgetById(model.wgid);

            if (_widget) { //update an existing widget
                var new_widget = WidgetService.updateWidget(model.wgid, widget);
                console.log('updated');
                console.log(new_widget)
                $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/' + model.pid + '/widget/');
            } else {
                console.log('yarg');
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.wgid);
        }
    }

})();