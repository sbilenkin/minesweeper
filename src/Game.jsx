import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import Grid from "./Grid";

function Game() {
    const [squares, setSquares] = useState(null);
    const [mines, setMines] = useState([null]);
    const [numMines, setNumMines] = useState(null);
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
                // 9x9 10 mines
                setSquares(Array(9).fill(Array(9).fill(null)));
                setMines(Array(9).fill(Array(9).fill(null)));
                setDims([9, 9]);
                break;
            case "medium":
                // 16x16 40 mines
                setSquares(Array(16).fill(Array(16).fill(null)));
                setMines(Array(16).fill(Array(16).fill(null)));
                setDims([16, 16]);
                break;
            case "hard":
                // 30x16 99 mines
                setSquares(Array(16).fill(Array(30).fill(null)));
                setMines(Array(16).fill(Array(30).fill(null)));
                setDims([16, 30]);
                break;
        }
    }

    useEffect(() => {
        if (!numMines && mines && squares && dims && mines.length > 0 && squares.length > 0 && dims.length > 0) {
            switch(dims[1]) {
                case 9:
                    putMines(10);
                    break;
                case 16:
                    putMines(40);
                    break;
                case 30:
                    putMines(99);
                    break;
            }
        }
    }, [mines, squares, dims]);

    function putMines(num) {
        const flatMines = mines.flat();
        const spots = [];
        while(spots.length < num) {
            const spot = Math.floor(Math.random() * flatMines.length);
            if (!spots.includes(spot)) {
                spots.push(spot);
            }
        }
        const newMines = mines.map(x => x.slice());
        spots.forEach(spot => {
            const row = Math.floor(spot / dims[1]);
            const col = spot % dims[1];
            newMines[row][col] = 'M';
        });
        setMines(newMines);
        setNumMines(num);
    }

    useEffect(() => {
        if(numMines) {
            for(const row in mines) {
                for(const col in mines[row]) {
                    if(mines[row][col] !== 'M') {
                        let count = 0;
                        for(let i = -1; i < 2; i++) {
                            for(let j = -1; j < 2; j++) {
                                if(mines[parseInt(row) + i] && mines[parseInt(row) + i][parseInt(col) + j] === 'M') {
                                    count++;
                                }
                            }
                        }
                        mines[row][col] = count;
                    }
                }
            }
        }
    }, [numMines]);

    console.log("mines:", mines);

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