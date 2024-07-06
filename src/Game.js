import { useState } from "react";
import Grid from "./Grid";

function Game() {
    // const [squares, setSquares] = useState(null);
    const [squares, setSquares] = useState(null);
    const [level, setLevel] = useState(null);

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

    function difClick(val) {
        setLevel(val);
        console.log(val);
        switch (val) {
            case "easy":
                setSquares(Array(81).fill(null));
                break;
            case "medium":
                setSquares(Array(256).fill(null));
                break;
            case "hard":
                setSquares(Array(480).fill(null));
                break;
        }
    }

    return (
      <>
        {!squares ? <ul>
            <li onClick={() => difClick("easy")} >Easy</li>
            <li onClick={() => difClick("medium")} >Medium</li>
            <li onClick={() => difClick("hard") } >Hard</li>
        </ul> : 
        <Grid squares={squares} onLClick={handleLClick} onRClick={handleRClick} level={level} />}
      </>
    );
}

export default Game;