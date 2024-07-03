import { useState } from 'react';
import Square from "./Square";

function Grid() {
    const[squares, setSquares] = useState(Array(81).fill(null));

    function handleLClick(i) {
        const newSquares = squares.slice();
        newSquares[i] = 'X';
        setSquares(newSquares);
    }

    function handleRClick(i, event) {
        event.preventDefault();
        const newSquares = squares.slice();
        newSquares[i] = 'O';
        setSquares(newSquares);
    }

    const easyNums = [...Array(81).keys()];
    const easySqs = easyNums.map(sq => <Square key={sq} val={squares[sq]} onLClick={() => handleLClick(sq)} onRClick={(event) => handleRClick(sq, event)} />);
    const easyGrid = [...Array(9).keys()];
    const easy = easyGrid.map(row => <div className='board-row'>{[...easySqs.slice(row * 9, (row + 1) * 9)]}</div>);
    console.log(easy);

    return (
        <div>
            {easy}
        </div>
    );
}

export default Grid;