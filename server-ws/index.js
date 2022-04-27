import { WebSocketServer } from 'ws';
import GameService from './services/service.js';
import RestService from './services/rest.js';
import shortid from 'shortid';

const service = new GameService();
const restService = new RestService();

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
    restService.doesCanvasExist(data.canvasId, (result) => {
        console.log('res', result);

        if (result) {
            service.addCanvas(result.id, result.size);

            ws.id = shortid.generate();
            ws.canvasId = result.id;

            ws.send(
                JSON.stringify({
                    type: 'clientInit',
                    data: {
                        size: result.size,
                        canvas: service.getCanvasState(result.id),
                        clientId: ws.id,
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
    service.updateCell(
        canvasId,
        clientResponse.updatedCell.x,
        clientResponse.updatedCell.y,
        clientResponse.updatedCell.color
    );
    restService.savePlay(
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
                        updatedCell: service.getCanvasCellState(
                            canvasId,
                            clientResponse.updatedCell.x,
                            clientResponse.updatedCell.y
                        ),
                    },
                })
            );
        }
    });
};

setTimeout(() => {
    setInterval(() => {
        const active = service.getActiveCanvasCount();

        if (active > 0) {
            service.getActiveCanvas().forEach((c) => {
                restService.saveSnapshot(c.canvasId, c.state);
            });
        }
    }, 10000);
}, 10000);
