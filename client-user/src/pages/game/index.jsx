import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

const GamePage = () => {
    const [selectedColor, setSelectedColor] = useState(50);
    const [time, setTime] = useState(new Date().getTime());
    const [canvas, setCanvas] = useState([]);
    const [clinetId, setClientId] = useState(1);
    const [size, setSize] = useState();

    const { canvasId } = useParams();

    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:9999');
        ws.current.onopen = () => {
            console.log('ws opened');
            ws.current.send(JSON.stringify(
                {
                    type: 'init',
                    data: {
                        canvasId: canvasId,
                    },
                }
            ))
        };
        ws.current.onclose = () => console.log('ws closed');

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, [canvasId]); // this is called once

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            const response = JSON.parse(e.data.toString());

            // console.log('message', response);
            switch (response.type) {
                case 'clientInit': {
                    setCanvas(response.data.canvas);
                    setClientId(response.data.clientId);
                    setSize(response.data.size);
                    // console.log('init response: ', response.data);
                 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvas]); // this is triggered everytime time state is updated

    const selectColorClick = (colorIndex) => {
        setSelectedColor(colorIndex);
    }

    const cellClick = (x, y) => {
        if (selectedColor === 50) { return; }

        let payload = {x, y, color: selectedColor};

        // console.log(payload);

        ws.current.send(
            JSON.stringify({
                type: 'updateCell',
                data: {
                    canvasId: canvasId,
                    clientId: clinetId,
                    updatedCell: payload
                }
            })
        );
    }

    const isColorSelected = (i) => {
        return selectedColor === i ? 'selected' : '';
    }

    return (
        <div className="container">
            <h1>PIXELWARS</h1>
            <br />
            <span className="border-box">
                {canvas ? (
                    canvas.map((row, x) => {
                        return (
                            <div className="row" key={x}>
                                {row.map((cell, y) => {
                                    return (
                                        <div
                                            className={'color-' + cell.color}
                                            key={y}
                                            onClick={() => cellClick(x, y)}
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
            <div className="border-box colors">
                <div className="row">
                    <div className={`color-0 ${isColorSelected(0)}`} onClick={() => selectColorClick(0)}></div>
                    <div className={`color-1 ${isColorSelected(1)}`} onClick={() => selectColorClick(1)}></div>
                    <div className={`color-2 ${isColorSelected(2)}`} onClick={() => selectColorClick(2)}></div>
                    <div className={`color-3 ${isColorSelected(3)}`} onClick={() => selectColorClick(3)}></div>
                    <div className={`color-4 ${isColorSelected(4)}`} onClick={() => selectColorClick(4)}></div>
                    <div className={`color-5 ${isColorSelected(5)}`} onClick={() => selectColorClick(5)}></div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;