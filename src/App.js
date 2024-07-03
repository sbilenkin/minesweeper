// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Grid from './Grid.js';
import Game from './Game.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Grid /> */}
        <Game />
      </header>
    </div>
  );
}

export default App;
