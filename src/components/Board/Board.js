import './Board.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  useGetAllListsOfOneBoardQuery,
  useGetAllBoardsQuery,
  useGetOneBoardQuery,
  useDeleteBoardMutation,
} from './../../API/APIslice';

import {
  setToggleBordOptions,
  setToggleTaskModal,
  setSelectedBoardID,
} from './../App/appSlice';

import Lists from '../Lists/Lists';
import ListsEmpty from '../Lists/ListsEmpty';

function Board() {
  const { selectedBoardId, toggleBordOptions, toggleSidebar } = useSelector(
    (state) => state.app
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [deleteBoard] = useDeleteBoardMutation();

  const boardData = useGetOneBoardQuery(selectedBoardId).data;
  const listsOfBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;
  const boardsDataQuery = useGetAllBoardsQuery();

  console.log(listsOfBoardData);

  const handleDeleteBoard = () => {
    deleteBoard(boardData.id)
      .unwrap()
      .then(() => {
        dispatch(setToggleBordOptions());
        dispatch(setSelectedBoardID(null));
        boardsDataQuery.refetch();
      });
  };

  return (
    <section className={toggleSidebar ? 'board w-80' : 'board w-100'}>
      <div className="board-header">
        <h1 className="board-title">{boardData?.name}</h1>
        <div className="board-header-right">
          {listsOfBoardData?.length === 0 ? (
            <Link
              to={`/list/create`}
              state={{ background: location }}
              onClick={() => dispatch(setToggleTaskModal())}
              className="main-button"
            >
              <i className="fa-sharp fa-solid fa-plus"></i> Add New Column
            </Link>
          ) : (
            <Link
              to={`/task/create`}
              state={{ background: location }}
              onClick={() => dispatch(setToggleTaskModal())}
              className="main-button"
            >
              <i className="fa-sharp fa-solid fa-plus"></i> Add New Task
            </Link>
          )}

          <img
            src={require('./../../assets/images/icon-vertical-ellipsis.png')}
            alt="board option icon"
            className="boards-element-icon"
            onClick={() => dispatch(setToggleBordOptions())}
          />
          {toggleBordOptions && (
            <div className="board-options-container">
              <p>Edit Board</p>
              <p className="danger" onClick={() => handleDeleteBoard()}>
                Delete Board
              </p>
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
