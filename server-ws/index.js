import { WebSocketServer } from 'ws';
import GameService from './services/service.js';
import RestService from './services/rest.js';
import shortid from 'shortid';

const size = process.env.SIZE ?? 3;

const service = new GameService(size);
const restService = new RestService();

// service.draw();

const wss = new WebSocketServer({ port: 9999 });

wss.on('connection', (ws) => {
    const clientId = shortid.generate();
    ws.id = clientId;

    ws.on('message', (data) => {
        const response = JSON.parse(data.toString());

        switch (response.type) {
            case 'init': {
                init(ws, clientId, response.data);
                break;
            }
            case 'updateCell': {
                updateCell(response.data);
                break;
            }
            default: {
                console.log(`unknown type ${response.type}`);
            }
        }
    });

    setInterval(() => {
        restService.saveSnapshot(1, service.canvas);
    }, 10000);
});

console.log('WS server started');
console.log('Size: ', size);

const init = (ws, clientId, data) => {
    console.log('new client:', clientId);

    restService.doesCanvasExist(data.canvasId, (result) => {
        if (result) {
            ws.send(
                JSON.stringify({
                    type: 'clientInit',
                    data: {
                        size,
                        canvas: service.canvas,
                        clientId: clientId,
                    },
                })
            );
        } else {
            ws.send(
                JSON.stringify({
                    type: 'badCanvasId',
                })
            );
        }
    });
};

const updateCell = (data) => {
    service.updateCell(
        data.updatedCell.x,
        data.updatedCell.y,
        data.updatedCell.color
    );
    restService.savePlay(data.canvasId, data.clientId, data.updatedCell);

    wss.clients.forEach(function each(client) {
        client.send(
            JSON.stringify({
                type: 'update',
                data: {
                    message: 'refresh',
                    updatedCell:
                        service.canvas[data.updatedCell.x][data.updatedCell.y],
                },
            })
        );
    });
};
