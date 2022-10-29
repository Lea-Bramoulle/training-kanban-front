import './Board.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  useGetAllListsOfOneBoardQuery,
  useGetOneBoardQuery,
} from './../../API/APIslice';

import { setToggleBordOptions } from './../App/appSlice';

import Lists from '../Lists/Lists';
import ListsEmpty from '../Lists/ListsEmpty';

function Board() {
  const { selectedBoardId, toggleBordOptions } = useSelector(
    (state) => state.app
  );

  const dispatch = useDispatch();

  const boardData = useGetOneBoardQuery(selectedBoardId).data;
  const listsOfBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  console.log(listsOfBoardData);

  return (
    <section className="board">
      <div className="board-header">
        <h1 className="board-title">{boardData?.name}</h1>
        <div className="board-header-right">
          <button className="main-button">Add new task</button>
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
