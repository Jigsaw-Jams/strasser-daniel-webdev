(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<div class='alert alert-success'>Lorem ipsum</div>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "I am an h4"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/9bZkp7q19f0" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<div class='alert alert-danger'>Lorem ipsum</div>"}
        ];

        var api = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };
        return api;

        // --------- FUNCTIONS ---------- //
        /**
         * Adds the widget parameter instance to the local widgets array. The new widget's pageId is set to the pageId parameter
         */
        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        /**
         * Retrieves the widgets in local widgets array whose pageId matches the parameter pageId
         */
        function findWidgetsByPageId(pageId) {
            var _widgets = [];
            for (var w in widgets) {
                var _widget = widgets[w];
                if(_widget.pageId === pageId) {
                    _widgets.push(_widget);
                }
            }
            return _widgets;
        }

        /**
         * Retrieves the widget in local widgets array whose _id matches the widgetId parameter
         */
        function findWidgetById(widgetId) {
            for (var w in widgets) {
                var _widget = widgets[w];
                if(_widget._id === widgetId) {
                    return _widget;
                }
            }
            return null;
        }

        /**
         * Updates the widget in local widgets array whose _id matches the widgetId parameter
         */
        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                var _widget = widgets[w];
                if(_widget._id === widgetId) {
                    _widget = widget;
                    return _widget;
                }
            }
            return null;
        }

        /**
         * Removes the widget from local widgets array whose _id matches the widgetId parameter
         */
        function deleteWidget(widgetId) {
            for (var w in widgets) {
                var _widget = widgets[w];
                if(_widget._id === widgetId) {
                    widgets.splice(w, 1); // remove the wth element from the users array
                }
            }
            return null;
        }

    }
})();
