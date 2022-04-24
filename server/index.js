import { WebSocketServer } from 'ws';
import { GameService } from './services/service.js';
import shortid from 'shortid';

const size = process.env.SIZE ?? 10;

const service = new GameService(size);

// service.draw();

const wss = new WebSocketServer({ port: 9999 });

wss.on('connection', function connection(ws) {
    const clientId = shortid.generate();
    ws.id = clientId;

    ws.send(
        JSON.stringify({
            type: 'init',
            data: {
                canvas: service.canvas,
                size,
                connId: clientId,
            },
        })
    );

    ws.on('message', (data) => {
        const response = JSON.parse(data.toString());

        switch (response.type) {
            case 'init': {
                init(response.data);
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
});

console.log('WS server started');
console.log('Size: ', size);

const init = (data) => {
    console.log('New client: ', data);
};

const updateCell = (data) => {
    console.log('Data recieved: ', data);
    service.updateCell(
        data.updatedCell.x,
        data.updatedCell.y,
        data.updatedCell.color
    );

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
