import ws from 'ws';

const serverAddress = process.env.URL ?? 'ws://localhost:9999';

var client = new ws(serverAddress);

var canvasId = 1;

var clientMetaData = {};

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
            clientInitialization(response);
            break;
        }
        case 'update': {
            updateCanvas(response);
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

function clientInitialization(response) {
    clientMetaData = response.data;
    console.log('init', {
        clientMetaData,
        canvasId,
    });
}

function updateCanvas(response) {
    const x = response.data.updatedCell.x;
    const y = response.data.updatedCell.y;

    clientMetaData.canvas[x][y] = {
        x,
        y,
        color: response.data.updatedCell.color,
    };
    // console.log('Updated canvas: ', clientMetaData.canvas);
}

setTimeout(() => {
    setInterval(() => {
        updateRandomCell();
    }, 1000);
}, 2000);

function updateRandomCell() {
    if (!clientMetaData) {
        return;
    }

    const min = 0;
    const max = clientMetaData.size + 1;

    // const min = 0;
    // const max = 3;

    let updatedCell = {
        x: getRandomNumber(min, max),
        y: getRandomNumber(min, max),
        color: getRandomNumber(0, 6),
    };

    client.send(
        JSON.stringify({
            type: 'updateCell',
            data: {
                canvasId,
                clientId: clientMetaData.clientId,
                updatedCell,
            },
        })
    );
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Register web client payload
// {"type":"init","data":{"message":"Hello from web client"}}
