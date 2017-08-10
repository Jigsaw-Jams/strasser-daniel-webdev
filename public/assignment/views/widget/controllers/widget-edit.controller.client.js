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
            WidgetService.findWidgetById(model.wgid)
                .then(function (response) {
                    model.widget = response.data;
                });
        }
        init();

        function updateWidget (widget) {
            WidgetService.updateWidget(model.wgid, widget)
                .then(function (response) {
                    model.successMessage = "The widget was updated successfully!";
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your widget was not updated. Please try again";
                });
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.wgid, model.pid)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/' + model.pid + '/widget/');
                }, function (rejection) {
                    model.errorMessage = "Sorry an error was encountered and your widget was not deleted. Please try again";
                });
        }
    }

})();