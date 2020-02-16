var App = /** @class */ (function () {
    function App() {
        this.Requester = new Requester();
        this.GetServers();
        this.SetHandlers();
    }
    App.prototype.SetHandlers = function () {
        document.getElementById("create-server-btn").addEventListener("click", this.CreateServer.bind(this));
        document.getElementById("delete-servers-btn").addEventListener("click", this.DeleteServers.bind(this));
        setInterval(function () {
            App.UpdateUsageTime();
        }, 100);
    };
    App.UpdateUsageTime = function () {
        var dateNow = new Date();
        var html = "<h2>CurrentDateTime: " + Extensions.ToPrettyDate(dateNow) + "</h2>";
        var usageTicks = Extensions.GetTotalUsageTicks(App.VirtualServers);
        html += "<h2>TotalUsageTime: " + Extensions.GetTimeFromTicks(usageTicks) + "</h2>";
        ;
        document.getElementById("total-usage-info").innerHTML = html;
    };
    App.GetDeleteCheckBox = function (data) {
        if (data.RemovedOn != null) {
            return '';
        }
        return "<div class=\"form-check\">\n                        <input type=\"checkbox\" " + App.DataServerAttributeName + "=\"" + data.Id + "\" class=\"" + App.DeleteServerCheckBoxClass + " form-check-input\">\n                    </div>";
    };
    App.GetServersHandler = function (data) {
        App.VirtualServers = data;
        //указанные свойста приходят с сервера как строка, поэтому преобразовываем их к дате 
        Extensions.ProccessStringPropertiesAsDateTime(data, ["CreatedOn", "RemovedOn"]);
        var html = '';
        App.VirtualServers.forEach(function (x) {
            html += "<tr>\n                <td>" + x.Id + "</td>\n                <td>" + Extensions.ToPrettyDate(x.CreatedOn) + "</td>\n                <td>\n                    " + (x.RemovedOn == null ? 'Не удалено' : Extensions.ToPrettyDate(x.RemovedOn)) + "\n                </td>\n                <td>\n                    " + App.GetDeleteCheckBox(x) + "\n                </td>\n            </tr>";
        });
        document.getElementById("servers-table-body").innerHTML = html;
    };
    App.prototype.GetServers = function () {
        this.Requester.Post('/Api/VirtualServer/Get', {}, App.GetServersHandler, null);
    };
    App.prototype.CreateOrDeleteServerHandler = function (data) {
        alert(data.Message);
        if (data.IsSucceeded) {
            setTimeout(function () { return location.reload(); }, 500);
        }
    };
    App.prototype.CreateServer = function () {
        this.Requester.Post('/Api/VirtualServer/Create', {}, this.CreateOrDeleteServerHandler, null);
    };
    App.prototype.DeleteServers = function () {
        //Получаем идентификаторы серверов, которые выделены для удаления
        var serverIds = Array.from(document.getElementsByClassName(App.DeleteServerCheckBoxClass)).filter(function (x) {
            return x.checked;
        }).map(function (x) { return Number(x.getAttribute(App.DataServerAttributeName)); });
        var data = {
            Ids: serverIds
        };
        this.Requester.Post('/Api/VirtualServer/Delete', data, this.CreateOrDeleteServerHandler, null);
    };
    App.DeleteServerCheckBoxClass = "delete-server-checkbox";
    App.DataServerAttributeName = "data-server-id";
    return App;
}());
new App();
