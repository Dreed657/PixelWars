const BASE_REST_URL =
    process.env.REACT_APP_BASE_REST_URL ?? 'http://localhost:5555/v1';

export const getTotals = (callback) => {
    fetch(`${BASE_REST_URL}/stats/totals`)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        });
};

export const getPlayPerClient = (callback) => {
    fetch(`${BASE_REST_URL}/stats/playsPerClient`)
        .then((res) => res.json())
        .then((response) => {
            callback({
                datasets: [
                    {
                        label: 'Plays per client',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        data: response.map((p) => {
                            return {
                                x: p.clientId,
                                y: p.total,
                            };
                        }),
                    },
                ],
            });
        });
};

export const getPlayPerCanvas = (callback) => {
    fetch(`${BASE_REST_URL}/stats/playsPerCanvas`)
        .then((res) => res.json())
        .then((response) => {
            callback({
                datasets: [
                    {
                        label: 'Plays per canvas',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        data: response.map((p) => {
                            return {
                                x: p.canvasId.toString(),
                                y: p.total,
                            };
                        }),
                    },
                ],
            });
        });
};

export const getSnaphotsByHour = (callback) => {
    fetch(`${BASE_REST_URL}/stats/snaphotsByHour`)
        .then((res) => res.json())
        .then((response) => {
            callback({
                datasets: [
                    {
                        label: 'Snapshots by hour',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        data: response.map((p) => {
                            return {
                                x: new Date(p.timestamp).toDateString(),
                                y: p.count,
                            };
                        }),
                    },
                ],
            });
        });
};

export const getPlaysByHour = (callback) => {
    fetch(`${BASE_REST_URL}/stats/playsByHour`)
        .then((res) => res.json())
        .then((response) => {
            callback({
                datasets: [
                    {
                        label: 'Plays by hour',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        data: response.map((p) => {
                            return {
                                x: new Date(p.timestamp).toDateString(),
                                y: p.total,
                            };
                        }),
                    },
                ],
            });
        });
};
