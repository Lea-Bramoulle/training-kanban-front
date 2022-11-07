import './../../styles/_reset.scss';
import './../../components/App/App.scss';
import React from 'react';

import { useSelector } from 'react-redux';

import Sidebar from './../../components/Sidebar/Sidebar';
import Board from '../../components/Board/Board';
import BoardEmpty from '../../components/Board/BoardEmpty';

function Home() {
  const { selectedBoardId } = useSelector((state) => state.app);

  return (
    <div className="main-container">
      <Sidebar />
      {selectedBoardId ? <Board /> : <BoardEmpty />}
    </div>
  );
}

export default Home;
