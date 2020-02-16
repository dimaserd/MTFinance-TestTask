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
declare class App {
    static DeleteServerCheckBoxClass: string;
    static DataServerAttributeName: string;
    static VirtualServers: Array<VirtualServerModel>;
    Requester: Requester;
    constructor();
    SetHandlers(): void;
    static UpdateUsageTime(): void;
    static GetDeleteCheckBox(data: VirtualServerModel): string;
    static GetServersHandler(data: Array<VirtualServerModel>): void;
    GetServers(): void;
    CreateOrDeleteServerHandler(data: BaseApiResponse): void;
    CreateServer(): void;
    DeleteServers(): void;
}
