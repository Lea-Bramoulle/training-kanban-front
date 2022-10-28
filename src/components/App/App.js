import './App.scss';
import './../../styles/_reset.scss';

import React from 'react';

import Sidebar from './../Sidebar/Sidebar';
import Board from '../Board/Board';

function App() {
  return (
    <div className="main-container">
      <Sidebar />
      <Board />
    </div>
  );
}

export default App;
