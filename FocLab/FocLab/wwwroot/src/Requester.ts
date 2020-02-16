class Requester {
    static SendAjaxPostInner(link: string, data: Object, onSuccessFunc: Function, onErrorFunc: Function, animations: boolean) {
        let params: any = {};
        params.type = "POST";
        params.data = data;
        params.url = link;
        params.async = true;
        params.cache = false;
        params.success = (response => {
            if (onSuccessFunc) {
                onSuccessFunc(response);
            }
        }).bind(this);
        params.error = ((jqXHR, textStatus, errorThrown) => {
            //Вызываю внешнюю функцию-обработчик
            if (onErrorFunc) {
                onErrorFunc(jqXHR, textStatus, errorThrown);
            }
        }).bind(this);
        const isArray = data.constructor === Array;
        if (isArray) {
            params.contentType = "application/json; charset=utf-8";
            params.dataType = "json";
            params.data = JSON.stringify(data);
        }
        $.ajax(params);
    }
    Post<TObject>(link: string, data: Object, onSuccessFunc: (x: TObject) => void, onErrorFunc: Function) {
        Requester.SendAjaxPostInner(link, data, onSuccessFunc, onErrorFunc, false);
    }
}