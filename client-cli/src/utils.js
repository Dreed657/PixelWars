import fetch from 'node-fetch';

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export async function getAllValidCanvases(REST_ADDRESS) {
    var result = [];

    await fetch(`${REST_ADDRESS}/canvas`)
        .then((res) => res.json())
        .then((data) => {
            result = data.data.map((c) => {
                return c.id;
            });
        })
        .catch((e) => {
            console.log(e.message);
            process.exit(1);
        });

    console.log('All available canvases:', result);
    return result;
}
