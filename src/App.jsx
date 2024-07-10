// import logo from './logo.svg';
import React from 'react';
import { useState } from 'react';
import './App.css';
import Grid from './Grid.jsx';
import Game from './Game.jsx';

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
