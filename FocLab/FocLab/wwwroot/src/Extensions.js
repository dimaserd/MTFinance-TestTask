var Extensions = /** @class */ (function () {
    function Extensions() {
    }
    Extensions.ToPrettyDate = function (date) {
        //Двигаю дату чтобы было в нашем часовом поясе
        var nDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        return nDate.toISOString().replace('T', ' ').substr(0, 19);
    };
    Extensions.ProccessStringPropertiesAsDateTime = function (obj, propNames) {
        var _this = this;
        if (Array.isArray(obj)) {
            return obj.map(function (x) { return _this.ProccessStringPropertiesAsDateTime(x, propNames); });
        }
        for (var i in obj) {
            var oldValue = obj[i];
            if (Array.isArray(oldValue)) {
                obj[i] = oldValue.map(function (x) { return _this.ProccessStringPropertiesAsDateTime(x, propNames); });
                continue;
            }
            if (oldValue instanceof Object && oldValue.constructor === Object) {
                obj[i] = this.ProccessStringPropertiesAsDateTime(oldValue, propNames);
                continue;
            }
            if (propNames.findIndex(function (t) { return t === i; }) > -1 && obj[i] != null) {
                obj[i] = new Date(oldValue);
            }
        }
        return obj;
    };
    Extensions.GetVirtualServerLife = function (server, dateNow) {
        return server.RemovedOn == null ? dateNow.getTime() - server.CreatedOn.getTime() : server.RemovedOn.getTime() - server.CreatedOn.getTime();
    };
    Extensions.GetTimeFromTicks = function (ticks) {
        //get seconds from ticks
        var ts = ticks / 1000;
        //conversion based on seconds
        var hh = Math.floor(ts / 3600);
        var mm = Math.floor((ts % 3600) / 60);
        var ss = Math.floor((ts % 3600) % 60);
        //prepend '0' when needed
        var hhT = hh < 10 ? '0' + hh : hh;
        var mmT = mm < 10 ? '0' + mm : mm;
        var ssT = ss < 10 ? '0' + ss : ss;
        //use it
        return hhT + ":" + mmT + ":" + ssT;
    };
    Extensions.GetServerLifeSpan = function (server, dateNow) {
        return {
            StartedOn: server.CreatedOn.getTime(),
            FinishedOn: server.RemovedOn == null ? dateNow.getTime() : server.RemovedOn.getTime()
        };
    };
    /**
     * Получить непересекающиеся границы элементов (Данный метод протестирован в папке tests)
     * @param data
     */
    Extensions.GetDistances = function (data) {
        //Кладу первый
        var distances = [data[0]];
        for (var i = 1; i < data.length; i++) {
            var lastIndexOfDistances = distances.length - 1;
            //Если последняя дистанция полностью содержит в себе последующую то игнорируем ее, так как при расчете она ни на что не повлияет
            if (data[i].StartedOn >= distances[lastIndexOfDistances].StartedOn && data[i].FinishedOn <= distances[lastIndexOfDistances].FinishedOn) {
                continue;
            }
            //Если последняя дистанция содержит начало, но не содержит конец, тогда сдвигаем ее правую границу
            else if (data[i].StartedOn > distances[lastIndexOfDistances].StartedOn && data[i].StartedOn < distances[lastIndexOfDistances].FinishedOn) {
                distances[lastIndexOfDistances].FinishedOn = data[i].FinishedOn;
                continue;
            }
            else {
                //Иначе если не попали ни в какие границы, то добавляем новый промежуток
                distances.push(data[i]);
            }
        }
        return distances;
    };
    Extensions.GetTotalUsageTicks = function (servers) {
        if (servers == null || servers.length === 0) {
            return 0;
        }
        var dateNow = new Date();
        //Высчитываю промежуток жизни для каждого сервера (если сервер еще жив, то текущей смертью его считаем текущую дату)
        var serverLifeSpans = servers.map(function (x) { return Extensions.GetServerLifeSpan(x, dateNow); })
            //Сортирую по взорастанию сначала по первому полю
            .sort(function (a, b) { return a.StartedOn - b.StartedOn; })
            //Затем по второму так как следующий алгоритм работает только по отсортированным данным
            .sort(function (a, b) { return a.FinishedOn - b.FinishedOn; });
        var distances = Extensions.GetDistances(serverLifeSpans);
        var result = 0;
        for (var i = 0; i < distances.length; i++) {
            result += distances[i].FinishedOn - distances[i].StartedOn;
        }
        return result;
    };
    return Extensions;
}());
