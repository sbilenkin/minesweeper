import React from 'react';
import { useState } from 'react';
import Square from "./Square";

function Grid({ squares, onLClick, onRClick, h, w }) {
    // const sqs = [...Array(h * w).keys()].map(sq => <Square key={sq} val={squares[Math.floor(sq / w)][sq % h]} onLClick={() => onLClick(sq)} onRClick={(event) => onRClick(sq, event)} />);
    // const toRender = [...Array(h).keys()].map(row => <div className='board-row'>{[...sqs.slice(row * w, (row + 1) * w)]}</div>);
    
    const toRender = [];
    for(let row = 0; row < h; row++) {
        const tmpRow = [];
        for(let col = 0; col < w; col++) {
            tmpRow.push(<Square key={row.toString() + "," + col.toString()} val={squares[row][col]} onLClick={() => onLClick(row, col)} onRClick={(event) => onRClick(row, col, event)} />);
        }
        toRender.push(<div className='board-row'>{[...tmpRow]}</div>);
    }

    console.log(squares);

    return (
        <div>
            {toRender}
        </div>
    );
}

export default Grid;