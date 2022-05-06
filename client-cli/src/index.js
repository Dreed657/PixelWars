import ws from 'ws';

const serverAddress = process.env.URL ?? 'ws://localhost:9999';

var client = new ws(serverAddress);

const REST_ADDRESS = process.env.REST_ADDRESS ?? 'http://localhost:5555/v1';

var clientId = 0;
var size = 0;
var canvas = [];
var canvasId = 2;

client.on('open', (ws) => {
    fetch(`${REST_ADDRESS}/canvas`)
        .then((res) => res.json())
        .then((data) => {
            let randomIndex = getRandomNumber(0, data.items);

            canvasId = data.data[randomIndex].id;
            client.send(
                JSON.stringify({
                    type: 'init',
                    data: {
                        canvasId,
                    },
                })
            );
        })
        .catch((e) => {
            console.log(e.message);
            process.exit(1);
        });
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
            process.exit(1);
            break;
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

setTimeout(() => {
    setInterval(() => {
        updateRandomCell();
    }, 500);
}, 2000);

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
