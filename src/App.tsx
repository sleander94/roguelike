import React from 'react';
import logo from './logo.svg';
import { Counter } from './slices/counter/Counter';
import './styles/main.css';
import { BattlePage } from './pages/BattlePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BattlePage />
      </header>
    </div>
  );
}

export default App;
