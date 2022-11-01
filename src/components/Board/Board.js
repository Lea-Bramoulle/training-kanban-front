import './Board.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';

import {
  useGetAllListsOfOneBoardQuery,
  useGetOneBoardQuery,
} from './../../API/APIslice';

import { setToggleBordOptions, setToggleTaskModal } from './../App/appSlice';

import Lists from '../Lists/Lists';
import ListsEmpty from '../Lists/ListsEmpty';

function Board() {
  const { selectedBoardId, toggleBordOptions, toggleSidebar } = useSelector(
    (state) => state.app
  );

  const dispatch = useDispatch();
  const location = useLocation();

  const boardData = useGetOneBoardQuery(selectedBoardId).data;
  const listsOfBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  console.log(listsOfBoardData);

  return (
    <section className={toggleSidebar ? 'board w-80' : 'board w-100'}>
      <div className="board-header">
        <h1 className="board-title">{boardData?.name}</h1>
        <div className="board-header-right">
          <Link
            to={`/task/create`}
            state={{ background: location }}
            onClick={() => dispatch(setToggleTaskModal())}
            className="main-button"
          >
            Add New Task
          </Link>
          <img
            src={require('./../../assets/images/icon-vertical-ellipsis.png')}
            alt="board option icon"
            className="boards-element-icon"
            onClick={() => dispatch(setToggleBordOptions())}
          />
          {toggleBordOptions && (
            <div className="board-options-container">
              <p>Edit Board</p>
              <p className="danger">Delete Board</p>
            </div>
          )}
        </div>
      </div>
      <div className="board-section">
        {listsOfBoardData?.length === 0 ? <ListsEmpty /> : <Lists />}
      </div>
    </section>
  );
}

export default Board;
