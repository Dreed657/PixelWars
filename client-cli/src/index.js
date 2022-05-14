import ws from 'ws';
import shortid from 'shortid';

import { GameClient } from './gameClient.js';
import { getRandomNumber, getAllValidCanvases } from './utils.js';

const SERVER_ADDRESS = process.env.URL ?? 'ws://localhost:9999';
const REST_ADDRESS = process.env.REST_ADDRESS ?? 'http://localhost:5555/v1';
const CLIENTS_COUNT = process.env.CLIENTS_COUNT ?? 5;

const activePlayers = [];
const validCanvases = await getAllValidCanvases(REST_ADDRESS);

var client = new ws(SERVER_ADDRESS);

setTimeout(() => {
    for (let i = 0; i < CLIENTS_COUNT; i++) {
        const index = getRandomNumber(0, validCanvases.length);
        const canvasId = validCanvases[index];
        const ref = shortid.generate();

        const player = new GameClient(ref, canvasId);

        client.send(
            JSON.stringify({
                type: 'init',
                data: {
                    ref: player.ref,
                    canvasId: player.canvasId,
                },
            })
        );

        activePlayers.push(player);
    }

    setInterval(() => {
        if (activePlayers.filter((c) => !c.isSetuped).length > 0) {
            console.log('Not all player clients are ready!');
            return;
        }

        for (const player of activePlayers) {
            client.send(
                JSON.stringify({
                    type: 'updateCell',
                    data: {
                        clientId: player.clientId,
                        updatedCell: {
                            x: getRandomNumber(0, player.size + 1),
                            y: getRandomNumber(0, player.size + 1),
                            color: getRandomNumber(0, 6),
                        },
                    },
                })
            );
        }
    }, 500);
}, 1000);

client.on('message', (message) => {
    let response = JSON.parse(message.toString());
    console.log('response type: ', response.type);

    switch (response.type) {
        case 'clientInit': {
            const data = response.data;
            const clientId = data.clientId;
            const canvas = data.canvas;
            const size = data.size;
            const ref = data.ref;

            const player = activePlayers.find((c) => c.ref === ref);
            player.setup(size, canvas, clientId);

            break;
        }
        case 'update': {
            const data = response.data;
            const clientId = response.data.clientId;
            const x = data.updatedCell.x;
            const y = data.updatedCell.y;
            const color = data.updatedCell.color;

            const player = activePlayers.find((c) => c.clientId === clientId);
            player.updateCell(x, y, color);

            break;
        }
        case 'badCanvasId': {
            console.log('Invalid canvasId');
            process.exit(1);
        }
        default: {
            console.log(`unknown type ${response.type}`);
        }
    }
});

client.on('close', () => {
    console.log('websocket closed');
    process.exit(1);
});
