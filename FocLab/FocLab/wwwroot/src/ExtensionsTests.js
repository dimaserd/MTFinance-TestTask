var ExtensionsTests = /** @class */ (function () {
    function ExtensionsTests() {
    }
    ExtensionsTests.Test = function () {
        var dist = Extensions.GetDistances([
            {
                StartedOn: 11,
                FinishedOn: 20
            },
            {
                StartedOn: 16,
                FinishedOn: 18
            },
            {
                StartedOn: 19,
                FinishedOn: 21
            },
            {
                StartedOn: 22,
                FinishedOn: 24
            },
            {
                StartedOn: 23,
                FinishedOn: 28
            },
        ]);
        console.log("CheckDistances", dist);
    };
    return ExtensionsTests;
}());
