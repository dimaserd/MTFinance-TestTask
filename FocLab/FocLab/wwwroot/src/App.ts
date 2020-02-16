interface BaseApiResponse {
    IsSucceeded: boolean;
    Message: string;
}

interface VirtualServerModel {
    Id: number;
    CreatedOn: Date;
    RemovedOn?: Date;
}

interface DeleteServers {
    Ids: number[];
}

interface ServerLifeSpan {
    StartedOn: number;
    FinishedOn: number;
}

class App {

    static DeleteServerCheckBoxClass: string = "delete-server-checkbox";

    static DataServerAttributeName: string = "data-server-id";

    /*
     * Текущее состояние вирутальных серверов
     */
    static VirtualServers: Array<VirtualServerModel>;

    Requester = new Requester();

    constructor() {
        this.GetServers();
        this.SetHandlers();
    }

    SetHandlers(): void {
        document.getElementById("create-server-btn").addEventListener("click", this.CreateServer.bind(this));
        document.getElementById("delete-servers-btn").addEventListener("click", this.DeleteServers.bind(this));
        
        setInterval(() => {
            App.UpdateUsageTime(); 
        }, 100);
    }

    static UpdateUsageTime() {
        const dateNow = new Date();

        let html = `<h2>CurrentDateTime: ${Extensions.ToPrettyDate(dateNow)}</h2>`;

        let usageTicks = Extensions.GetTotalUsageTicks(App.VirtualServers);
        html += `<h2>TotalUsageTime: ${Extensions.GetTimeFromTicks(usageTicks)}</h2>`;;
        
        document.getElementById("total-usage-info").innerHTML = html;
    }


    static GetDeleteCheckBox(data: VirtualServerModel): string {

        if (data.RemovedOn != null) {
            return '';
        }

        return `<div class="form-check">
                        <input type="checkbox" ${App.DataServerAttributeName}="${data.Id}" class="${App.DeleteServerCheckBoxClass} form-check-input">
                    </div>`;

    }

    static GetServersHandler(data: Array<VirtualServerModel>): void {

        App.VirtualServers = data;

        //указанные свойста приходят с сервера как строка, поэтому преобразовываем их к дате 
        Extensions.ProccessStringPropertiesAsDateTime(data, ["CreatedOn", "RemovedOn"]);

        let html = '';

        App.VirtualServers.forEach(x => {
            html += `<tr>
                <td>${x.Id}</td>
                <td>${Extensions.ToPrettyDate(x.CreatedOn)}</td>
                <td>
                    ${x.RemovedOn == null ? 'Не удалено' : Extensions.ToPrettyDate(x.RemovedOn)}
                </td>
                <td>
                    ${App.GetDeleteCheckBox(x)}
                </td>
            </tr>`;
        })

        document.getElementById("servers-table-body").innerHTML = html;
    }

    GetServers(): void {
        this.Requester.Post('/Api/VirtualServer/Get', {}, App.GetServersHandler, null);
    }

    CreateOrDeleteServerHandler(data: BaseApiResponse): void {
        alert(data.Message);

        if (data.IsSucceeded) {
            setTimeout(() => location.reload(), 500);
        }
    }

    CreateServer(): void {
        this.Requester.Post('/Api/VirtualServer/Create', {}, this.CreateOrDeleteServerHandler, null);
    }

    DeleteServers(): void {

        //Получаем идентификаторы серверов, которые выделены для удаления
        var serverIds = Array.from(document.getElementsByClassName(App.DeleteServerCheckBoxClass)).filter(x => {
            return (x as HTMLInputElement).checked;
        }).map(x => Number(x.getAttribute(App.DataServerAttributeName)));


        let data: DeleteServers = {
            Ids: serverIds
        };

        this.Requester.Post('/Api/VirtualServer/Delete', data, this.CreateOrDeleteServerHandler, null);
    }
}

new App();