import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
    const [time, setTime] = useState(new Date().getTime());
    const [canvas, setCanvas] = useState();
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://192.168.0.110:9999');
        ws.current.onopen = () => console.log('ws opened');
        ws.current.onclose = () => console.log('ws closed');

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []); // this is called once

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = (e) => {
            const response = JSON.parse(e.data.toString());

            // console.log('message', response);
            switch (response.type) {
                case 'init': {
                    setCanvas(response.data.canvas);
                    // console.log('init response: ', response.data);
                    ws.current.send(
                        JSON.stringify({
                            type: 'init',
                            data: {
                                message: `Hello from ${response.data.connId}`,
                            },
                        })
                    );
                    break;
                }
                case 'update': {
                    const x = response.data.updatedCell.x;
                    const y = response.data.updatedCell.y;
                    const color = response.data.updatedCell.color;

                    let dummyCanvas = canvas;
                    let newData = { color };
                    dummyCanvas[x][y] = newData;
                    setCanvas(dummyCanvas);

                    // console.log('Updated canvas: ', canvas);

                    // this is nessasery to trigger re-render because react useState hook dosen't like complex object and mostly arrays.
                    setTime(new Date().getTime());

                    break;
                }
                default: {
                    console.log(`unknown type ${response.type}`);
                }
            }
        };
    }, [canvas]); // this is triggered everytime time state is updated

    return (
        <div className="container">
            <h1>ARE WE THERE YET</h1>
            <h6>{new Date().getTime()}</h6>
            <h6>{time}</h6>
            <span className="border-box">
                {canvas ? (
                    canvas.map((row, i) => {
                        return (
                            <div className="row" key={i}>
                                {row.map((cell, y) => {
                                    return (
                                        <div
                                            className={'color-' + cell.color}
                                            key={y}
                                        ></div>
                                    );
                                })}
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </span>
        </div>
    );
};

export default App;
