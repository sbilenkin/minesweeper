import { useState } from 'react';
import Square from "./Square";

function Grid({ squares, onLClick, onRClick, level }) {
    // const easyNums = [...Array(81).keys()];
    // const easySqs = easyNums.map(sq => <Square key={sq} val={squares[sq]} onLClick={() => onLClick(sq)} onRClick={(event) => onRClick(sq, event)} />);
    // const easyGrid = [...Array(9).keys()];
    // const easy = easyGrid.map(row => <div className='board-row'>{[...easySqs.slice(row * 9, (row + 1) * 9)]}</div>);

    let toRender;
    const sqs = [...squares.keys()].map(sq => <Square key={sq} val={squares[sq]} onLClick={() => onLClick(sq)} onRClick={(event) => onRClick(sq, event)} />);
    switch(level) {
        case "easy":
            console.log("in");
            const easyGrid = [...Array(9).keys()];
            toRender = easyGrid.map(row => <div className='board-row'>{[...sqs.slice(row * 9, (row + 1) * 9)]}</div>);
            break;
        case "medium":
            const mediumGrid = [...Array(16).keys()];
            toRender = mediumGrid.map(row => <div className='board-row'>{[...sqs.slice(row * 16, (row + 1) * 16)]}</div>);
            break;
        case "hard":
            const hardGrid = [...Array(30).keys()];
            toRender = hardGrid.map(row => <div className='board-row'>{[...sqs.slice(row * 30, (row + 1) * 30)]}</div>);
            break;
    }
    console.log(toRender);
    console.log("level:");
    console.log(level);

    return (
        <div>
            {toRender}
        </div>
    );
}

export default Grid;