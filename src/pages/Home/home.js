import './../../styles/_reset.scss';
import './../../components/App/App.scss';
import React from 'react';

import Sidebar from './../../components/Sidebar/Sidebar';
import Board from '../../components/Board/Board';

function Home() {
  return (
    <div className="main-container">
      <Sidebar />
      <Board />
    </div>
  );
}

export default Home;
