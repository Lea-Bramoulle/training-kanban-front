import './Board.scss';
import './../../styles/_reset.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  useGetAllBoardsQuery,
  useGetOneBoardQuery,
  useDeleteBoardMutation,
} from './../../API/APIslice';

import { setToggleTaskModal, setSelectedBoardID } from './../App/appSlice';

function DeleteBoard() {
  const { selectedBoardId } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteBoard] = useDeleteBoardMutation();

  const boardData = useGetOneBoardQuery(selectedBoardId).data;
  const boardsDataQuery = useGetAllBoardsQuery();

  const handleDeleteBoard = () => {
    deleteBoard(boardData.id)
      .unwrap()
      .then(() => {
        dispatch(setSelectedBoardID(null));
        boardsDataQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-1);
      });
  };

  return ReactDOM.createPortal(
    <div className="board-delete">
      <div className="board-delete-container">
        <h2 className="board-delete-title">Delete this board?</h2>
        <p className="board-delete-desc">
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="board-delete-buttons">
          <button
            className="main-button-danger w-50"
            onClick={() => handleDeleteBoard(selectedBoardId)}
          >
            Delete Board
          </button>
          <button
            className="main-button-light w-50"
            onClick={() => {
              dispatch(setToggleTaskModal());
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default DeleteBoard;
