import { WebSocketServer } from 'ws';
import shortid from 'shortid';

import GameService from './services/service.js';
import RestService from './services/rest.js';

const wss = new WebSocketServer({ port: 9999 });

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const response = JSON.parse(data.toString());

        switch (response.type) {
            case 'init': {
                init(ws, response.data);
                break;
            }
            case 'updateCell': {
                updateCell(ws.canvasId, response.data);
                break;
            }
            default: {
                console.log(`unknown type ${response.type}`);
            }
        }
    });
});

console.log('WS server started');

const init = (ws, data) => {
    RestService.doesCanvasExist(data.canvasId, (result) => {
        console.log('res', result);

        if (result) {
            GameService.addCanvas(result.id, result.size);

            ws.id = shortid.generate();
            ws.canvasId = result.id;

            ws.send(
                JSON.stringify({
                    type: 'clientInit',
                    data: {
                        size: result.size,
                        canvas: GameService.getCanvasState(result.id),
                        clientId: ws.id,
                        ref: data.ref,
                    },
                })
            );

            console.log('new client:', {
                canvaId: ws.canvasId,
                clientId: ws.id,
            });
        } else {
            ws.send(
                JSON.stringify({
                    type: 'badCanvasId',
                })
            );
        }
    });
};

const updateCell = (canvasId, clientResponse) => {
    try {
        GameService.updateCell(
            canvasId,
            clientResponse.updatedCell.x,
            clientResponse.updatedCell.y,
            clientResponse.updatedCell.color
        );
        RestService.savePlay(
            canvasId,
            clientResponse.clientId,
            clientResponse.updatedCell
        );

        wss.clients.forEach((client) => {
            if (client.canvasId === canvasId) {
                client.send(
                    JSON.stringify({
                        type: 'update',
                        data: {
                            clientId: clientResponse.clientId,
                            updatedCell: GameService.getCanvasCellState(
                                canvasId,
                                clientResponse.updatedCell.x,
                                clientResponse.updatedCell.y
                            ),
                        },
                    })
                );
            }
        });
    } catch (e) {
        console.log(e.message);
    }
};

setTimeout(() => {
    setInterval(() => {
        const active = GameService.getActiveCanvasCount();

        if (active > 0) {
            GameService.getActiveCanvas().forEach((c) => {
                RestService.saveSnapshot(c.canvasId, c.state);
            });
        }
    }, 10000);
}, 10000);
