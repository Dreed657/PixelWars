// getById(canvasId)
// save(play)
// save(snapshot)

import axios from 'axios';

const REST_ADDRESS = process.env.REST_ADDRESS ?? 'http://localhost:5555/v1';

export default class RestService {
    doesCanvasExist(canvasId, callback) {
        axios
            .get(`${REST_ADDRESS}/canvas/${canvasId}`)
            .then((res) => {
                if (res.status === 200) {
                    callback(true);
                    return;
                }

                callback(false);
            })
            .catch((e) => {
                callback(false);
            });
    }

    async savePlay(canvasId, clientId, cell) {
        axios
            .post(`${REST_ADDRESS}/plays`, {
                canvasId,
                clientId,
                cell: JSON.stringify(cell),
            })
            .then(() => {
                console.log(
                    `Play saved canvas: ${canvasId}, client: ${clientId}`
                );
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    async saveSnapshot(canvasId, state) {
        axios
            .post(`${REST_ADDRESS}/snapshots`, {
                canvasId,
                state: JSON.stringify(state),
            })
            .then(() => {
                console.log(`Snapshot for canvas ${canvasId} saved!`);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}