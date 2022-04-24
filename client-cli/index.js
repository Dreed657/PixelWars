import ws from 'ws';

const serverAddress = process.env.URL ?? 'ws://localhost:9999';

var client = new ws(serverAddress);

var serverData = {};

client.on('message', (message) => {
    let response = JSON.parse(message.toString());

    console.log('response type: ', response.type);

    switch (response.type) {
        case 'init': {
            clientInitialization(response);
            break;
        }
        case 'update': {
            updateCanvas(response);
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
    serverData = response.data;
    console.log('init response: ', response);
    client.send(
        JSON.stringify({
            type: 'init',
            data: {
                message: `Hello from ${serverData.connId}`,
            },
        })
    );
}

function updateCanvas(response) {
    const x = response.data.updatedCell.x;
    const y = response.data.updatedCell.y;

    serverData.canvas[x][y] = { x, y, color: response.data.updatedCell.color };
    // console.log('Updated canvas: ', serverData.canvas);
}

setTimeout(() => {
    setInterval(() => {
        updateRandomCell();
    }, 100);
}, 1000);

function updateRandomCell() {
    if (!serverData) {
        return;
    }

    const min = 0;
    const max = serverData.size + 1;

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
