//https://learn.javascript.ru/testing

describe("Extensions.GetDistances", function() {

    it("Правильно высчитываются дистанции 1", function () {
        let dist = Extensions.GetDistances([
            {
                StartedOn: 11,
                FinishedOn: 20
            },
            {
                StartedOn: 16,
                FinishedOn: 18
            }
        ]);

        let expected = [
            {
                StartedOn: 11,
                FinishedOn: 20
            }
        ]

        assert.equal(JSON.stringify(expected), JSON.stringify(dist));
    });

    it("Правильно высчитываются дистанции 2", function () {
        let dist = Extensions.GetDistances([
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
        ]);

        let expected = [
            {
                StartedOn: 11,
                FinishedOn: 21
            }
        ]

        assert.equal(JSON.stringify(expected), JSON.stringify(dist));
    });

    it("Правильно высчитываются дистанции 3", function () {
        let dist = Extensions.GetDistances([
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
            }
        ]);

        let expected = [
            {
                StartedOn: 11,
                FinishedOn: 21
            },
            {
                StartedOn: 22,
                FinishedOn: 24
            }
        ]

        assert.equal(JSON.stringify(expected), JSON.stringify(dist));
    });


    it("Правильно высчитываются дистанции 4", function () {
        let dist = Extensions.GetDistances([
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

        let expected = [
            {
                StartedOn: 11,
                FinishedOn: 21
            },
            {
                StartedOn: 22,
                FinishedOn: 28
            }
        ]

        assert.equal(JSON.stringify(expected), JSON.stringify(dist));
    });
});