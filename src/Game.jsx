import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import Grid from "./Grid";
import PlayAgain from './PlayAgain';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { byPrefixAndName } from '@fortawesome/fontawesome-svg-core';

function Game() {
    const [squares, setSquares] = useState(null);
    const [mines, setMines] = useState([null]);
    const [numMines, setNumMines] = useState(null);
    const [dims, setDims] = useState([null, null]);
    const [numClicked, setNumClicked] = useState(0);

    function handleLClick(row, col) {
        if (mines[row][col] === 'M') {
            setNumMines(0);
            setNumClicked(0);
            return;
        }
        const newSquares = squares.map(x => x.slice());
        const visited = new Array(squares.length).fill(0).map(() => new Array(squares[0].length).fill(false));
        clickEmpty(newSquares, row, col, visited);
        setSquares(newSquares);
    }

    function clickEmpty(board, row, col, visited) {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || visited[row][col] || board[row][col]) {
            return;
        }
        setNumClicked(prevNumClicked => prevNumClicked + 1);
        if (mines[row][col] === 0) {
            board[row][col] = " ";
        }
        else {
            board[row][col] = mines[row][col];
        }
        visited[row][col] = true;
        if (adjMines(row, col, mines) === 0) {
            clickEmpty(board, row - 1, col, visited); // Up
            clickEmpty(board, row + 1, col, visited); // Down
            clickEmpty(board, row, col - 1, visited); // Left
            clickEmpty(board, row, col + 1, visited); // Right
            clickEmpty(board, row - 1, col - 1, visited); // Up-left
            clickEmpty(board, row - 1, col + 1, visited); // Up-right
            clickEmpty(board, row + 1, col - 1, visited); // Down-left
            clickEmpty(board, row + 1, col + 1, visited); // Down-right
        }
    }

    function handleRClick(row, col, event) {
        event.preventDefault();
        if (squares[row][col] === 'X') {
            const newSquares = squares.map(x => x.slice());
            newSquares[row][col] = null;
            setSquares(newSquares);
            return;
        }
        else if (!squares[row][col]) {
            const newSquares = squares.map(x => x.slice());
            // Should evenutally be a flag
            newSquares[row][col] = 'X';
            setSquares(newSquares);
        }
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
            switch (dims[1]) {
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
        while (spots.length < num) {
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
        if (numMines && numMines > 0) {
            const newMines = mines.map(x => x.slice());
            for (const row in newMines) {
                for (const col in newMines[row]) {
                    if (newMines[row][col] !== 'M') {
                        newMines[row][col] = adjMines(row, col, newMines);
                    }
                }
            }
            setMines(newMines);
        }
    }, [numMines]);

    function adjMines(row, col, board) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (board[parseInt(row) + i] && board[parseInt(row) + i][parseInt(col) + j] === 'M') {
                    count++;
                }
            }
        }
        return count;
    }

    function playAgnClick() {
        setSquares(null);
        setNumMines(null);
        setNumClicked(0);
    }

    console.log(numClicked);

    return (
        <>
            {!squares? <ul>
                <li onClick={() => difClick("easy")} >Yeehaw</li>
                <li onClick={() => difClick("medium")} >Medium</li>
                <li onClick={() => difClick("hard")} >Hard</li>
            </ul> :
                numClicked === dims[0] * dims[1] - numMines ? 
                <><h1>YOU WIN</h1>
                <PlayAgain onClick={playAgnClick} /></> :
                numMines === 0 ?
                <><h1>YOU LOSE</h1>
                <PlayAgain onClick={playAgnClick} /></> :
                <Grid squares={squares} onLClick={handleLClick} onRClick={handleRClick} h={dims[0]} w={dims[1]} />}
        </>
    );
}

export default Game;