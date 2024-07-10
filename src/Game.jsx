import React from 'react';
import { useState } from "react";
import Grid from "./Grid";

function Game() {
    const [squares, setSquares] = useState(null);
    const [mines, setMines] = useState(null);
    const [dims, setDims] = useState([null, null]);

    function handleLClick(row, col) {
        const newSquares = squares.map(x => x.slice());
        newSquares[row][col] = 'X';
        setSquares(newSquares);
        console.log(squares);
    }

    function handleRClick(row, col, event) {
        event.preventDefault();
        const newSquares = squares.map(x => x.slice());
        newSquares[row][col] = 'O';
        setSquares(newSquares);
    }

    function difClick(val) {
        switch (val) {
            case "easy":
                setSquares(Array(9).fill(Array(9).fill(null)));
                setMines(Array(9).fill(Array(9).fill(null)));
                setDims([9, 9]);
                break;
            case "medium":
                setSquares(Array(16).fill(Array(16).fill(null)));
                setMines(Array(16).fill(Array(16).fill(null)));
                setDims([16, 16]);
                break;
            case "hard":
                setSquares(Array(16).fill(Array(30).fill(null)));
                setMines(Array(16).fill(Array(30).fill(null)));
                setDims([16, 30]);
                break;
        }
    }

    return (
      <>
        {!squares ? <ul>
            <li onClick={() => difClick("easy")} >Yeehaw</li>
            <li onClick={() => difClick("medium")} >Medium</li>
            <li onClick={() => difClick("hard") } >Hard</li>
        </ul> : 
        <Grid squares={squares} onLClick={handleLClick} onRClick={handleRClick} h={dims[0]} w={dims[1]} />}
      </>
    );
}

export default Game;