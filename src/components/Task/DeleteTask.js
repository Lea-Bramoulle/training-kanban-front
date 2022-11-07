import './Task.scss';
import './../../styles/_reset.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  useGetOneBoardQuery,
  useGetAllListsOfOneBoardQuery,
  useDeleteTaskMutation,
} from './../../API/APIslice';

import { setToggleTaskModal } from './../App/appSlice';

function DeleteTask() {
  const { selectedBoardId, selectedTaskId } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteTask] = useDeleteTaskMutation();

  const selectedBoard = useGetOneBoardQuery(selectedBoardId).data;
  const selectedBoardQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const handleDeleteTask = () => {
    deleteTask(selectedTaskId)
      .unwrap()
      .then(() => {
        selectedBoardQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-2);
      });
  };

  return ReactDOM.createPortal(
    <div className="board-delete">
      <div className="board-delete-container">
        <h2 className="board-delete-title">Delete this Task ?</h2>
        <p className="board-delete-desc">
          Are you sure you want to delete the task '{selectedBoard?.name}' ?
          This action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="board-delete-buttons">
          <button
            className="main-button-danger w-50"
            onClick={() => handleDeleteTask()}
          >
            Delete Task
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

export default DeleteTask;
