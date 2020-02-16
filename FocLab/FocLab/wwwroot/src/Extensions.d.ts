declare class Extensions {
    static ToPrettyDate(date: Date): string;
    static ProccessStringPropertiesAsDateTime(obj: object, propNames: Array<string>): object;
    static GetVirtualServerLife(server: VirtualServerModel, dateNow: Date): number;
    static GetTimeFromTicks(ticks: number): string;
    static GetServerLifeSpan(server: VirtualServerModel, dateNow: Date): ServerLifeSpan;
    /**
     * Получить непересекающиеся границы элементов (Данный метод протестирован в папке tests)
     * @param data
     */
    static GetDistances(data: Array<ServerLifeSpan>): Array<ServerLifeSpan>;
    static GetTotalUsageTicks(servers: Array<VirtualServerModel>): number;
}
