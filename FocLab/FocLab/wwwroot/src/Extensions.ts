class Extensions {
    static ToPrettyDate(date: Date): string {

        //Двигаю дату чтобы было в нашем часовом поясе
        let nDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

        return nDate.toISOString().replace('T', ' ').substr(0, 19);
    }
    static ProccessStringPropertiesAsDateTime(obj: object, propNames: Array<string>): object {
        if (Array.isArray(obj)) {
            return (obj as Array<object>).map(x => this.ProccessStringPropertiesAsDateTime(x, propNames));
        }
        for (var i in obj) {
            let oldValue = obj[i];
            if (Array.isArray(oldValue)) {
                obj[i] = (oldValue as Array<object>).map(x => this.ProccessStringPropertiesAsDateTime(x, propNames));
                continue;
            }
            if (oldValue instanceof Object && oldValue.constructor === Object) {
                obj[i] = this.ProccessStringPropertiesAsDateTime(oldValue, propNames);
                continue;
            }
            if (propNames.findIndex(t => t === i) > -1 && obj[i] != null) {
                obj[i] = new Date(oldValue);
            }
        }
        return obj;
    }
    static GetVirtualServerLife(server: VirtualServerModel, dateNow: Date): number {
        return server.RemovedOn == null ? dateNow.getTime() - server.CreatedOn.getTime() : server.RemovedOn.getTime() - server.CreatedOn.getTime();
    }
    static GetTimeFromTicks(ticks: number): string {
        //get seconds from ticks
        var ts = ticks / 1000;
        //conversion based on seconds
        var hh = Math.floor(ts / 3600);
        var mm = Math.floor((ts % 3600) / 60);
        var ss = Math.floor((ts % 3600) % 60);
        //prepend '0' when needed
        const hhT = hh < 10 ? '0' + hh : hh;
        const mmT = mm < 10 ? '0' + mm : mm;
        const ssT = ss < 10 ? '0' + ss : ss;
        //use it
        return hhT + ":" + mmT + ":" + ssT;
    }
    static GetServerLifeSpan(server: VirtualServerModel, dateNow: Date): ServerLifeSpan {
        return {
            StartedOn: server.CreatedOn.getTime(),
            FinishedOn: server.RemovedOn == null ? dateNow.getTime() : server.RemovedOn.getTime()
        };
    }
    /**
     * Получить непересекающиеся границы элементов (Данный метод протестирован в папке tests)
     * @param data
     */
    static GetDistances(data: Array<ServerLifeSpan>): Array<ServerLifeSpan> {
        //Кладу первый
        let distances: Array<ServerLifeSpan> = [data[0]];
        for (let i = 1; i < data.length; i++) {
            let lastIndexOfDistances = distances.length - 1;
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
    }


    static GetTotalUsageTicks(servers: Array<VirtualServerModel>): number {

        if (servers == null || servers.length === 0) {
            return 0;
        }

        let dateNow = new Date();
        //Высчитываю промежуток жизни для каждого сервера (если сервер еще жив, то текущей смертью его считаем текущую дату)
        let serverLifeSpans = servers.map(x => Extensions.GetServerLifeSpan(x, dateNow))
            //Сортирую по взорастанию сначала по первому полю
            .sort((a, b) => a.StartedOn - b.StartedOn)
            //Затем по второму так как следующий алгоритм работает только по отсортированным данным
            .sort((a, b) => a.FinishedOn - b.FinishedOn);
        let distances: Array<ServerLifeSpan> = Extensions.GetDistances(serverLifeSpans);
        let result = 0;
        for (let i = 0; i < distances.length; i++) {
            result += distances[i].FinishedOn - distances[i].StartedOn;
        }
        return result;
    }
}
