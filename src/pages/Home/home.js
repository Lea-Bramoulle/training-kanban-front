import './../../styles/_reset.scss';
import './../../components/App/App.scss';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Sidebar from './../../components/Sidebar/Sidebar';
import Board from '../../components/Board/Board';

function Home() {
  const { selectedBoardId, toggleBordOptions, toggleSidebar } = useSelector(
    (state) => state.app
  );

  return (
    <div className="main-container">
      <Sidebar />
      {selectedBoardId ? <Board /> : ''}
    </div>
  );
}

export default Home;
