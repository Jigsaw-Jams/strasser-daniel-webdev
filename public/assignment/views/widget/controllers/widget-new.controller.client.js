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
        model.createWidget = createWidget;

        function init() {}
        init();

        function createWidget(type) {
            WidgetService.createWidget(model.pid, {'widgetType' : type})
                .then(function (response) {
                    var newWidget = response.data;
                    $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + newWidget._id);
                }, function (rejection) {
                    model.errorMessage = "Sorry your new widget could not be created. Please try again.";
                });
        }
    }
})();