import ws from 'ws';

const serverAddress = process.env.URL ?? 'ws://localhost:9999';

var client = new ws(serverAddress);

var clientId = 0;
var size = 0;
var canvas = [];
var canvasId = 2;

client.on('open', (ws) => {
    client.send(
        JSON.stringify({
            type: 'init',
            data: {
                canvasId,
            },
        })
    );
});

client.on('message', (message) => {
    let response = JSON.parse(message.toString());

    console.log('response type: ', response.type);

    switch (response.type) {
        case 'clientInit': {
            clientInitialization(response.data);
            break;
        }
        case 'update': {
            updateCanvas(response.data);
            break;
        }
        case 'badCanvasId': {
            console.log('Wrong canvasId');
            process.exit();
            break;
        }
        default: {
            console.log(`unknown type ${response.type}`);
        }
    }
});

client.on('close', () => {
    console.log('websocket closed');
    process.exit();
});

function clientInitialization(data) {
    clientId = data.clientId;
    canvas = data.canvas;
    size = data.size;

    console.log('init', {
        size,
        clientId,
        canvasId,
        canvas,
    });
}

function updateCanvas(data) {
    const x = data.updatedCell.x;
    const y = data.updatedCell.y;
    const color = data.updatedCell.color;

    canvas[x][y] = {
        x,
        y,
        color,
    };
}

setTimeout(() => {
    setInterval(() => {
        updateRandomCell();
    }, 500);
}, 2000);

function updateRandomCell() {
    if (!size || !clientId) {
        return;
    }

    const min = 0;
    const max = size + 1;

    let updatedCell = {
        x: getRandomNumber(min, max),
        y: getRandomNumber(min, max),
        color: getRandomNumber(0, 6),
    };

    client.send(
        JSON.stringify({
            type: 'updateCell',
            data: {
                clientId: clientId,
                updatedCell,
            },
        })
    );
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
