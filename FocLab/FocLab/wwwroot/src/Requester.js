var Requester = /** @class */ (function () {
    function Requester() {
    }
    Requester.SendAjaxPostInner = function (link, data, onSuccessFunc, onErrorFunc, animations) {
        var params = {};
        params.type = "POST";
        params.data = data;
        params.url = link;
        params.async = true;
        params.cache = false;
        params.success = (function (response) {
            if (onSuccessFunc) {
                onSuccessFunc(response);
            }
        }).bind(this);
        params.error = (function (jqXHR, textStatus, errorThrown) {
            //Вызываю внешнюю функцию-обработчик
            if (onErrorFunc) {
                onErrorFunc(jqXHR, textStatus, errorThrown);
            }
        }).bind(this);
        var isArray = data.constructor === Array;
        if (isArray) {
            params.contentType = "application/json; charset=utf-8";
            params.dataType = "json";
            params.data = JSON.stringify(data);
        }
        $.ajax(params);
    };
    Requester.prototype.Post = function (link, data, onSuccessFunc, onErrorFunc) {
        Requester.SendAjaxPostInner(link, data, onSuccessFunc, onErrorFunc, false);
    };
    return Requester;
}());
