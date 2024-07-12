import React from 'react';
import { useState } from 'react';
import Square from "./Square";

function Grid({ squares, onLClick, onRClick, h, w }) {
    const toRender = [];
    for(let row = 0; row < h; row++) {
        const tmpRow = [];
        for(let col = 0; col < w; col++) {
            tmpRow.push(<Square key={row.toString() + "," + col.toString()} val={squares[row][col]} onLClick={() => onLClick(row, col)} onRClick={(event) => onRClick(row, col, event)} />);
        }
        toRender.push(<div className='board-row'>{[...tmpRow]}</div>);
    }

    return (
        <div>
            {toRender}
        </div>
    );
}

export default Grid;