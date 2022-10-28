import './Board.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  useGetAllListsOfOneBoardQuery,
  useGetOneBoardQuery,
} from './../../API/APIslice';

function Board() {
  const selectedBoardId = useSelector((state) => state.app.selectedBoardId);

  const dispatch = useDispatch();

  const boardData = useGetOneBoardQuery(selectedBoardId).data;
  const listsOfBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  console.log(listsOfBoardData);

  return (
    <section className="board">
      <div className="board-title-container">
        <h1 className="board-title">{boardData.name}</h1>
      </div>
      <div className="board-section">
        {listsOfBoardData.length === 0 ? <div>coucou</div> : ' '}
      </div>
    </section>
  );
}

export default Board;
