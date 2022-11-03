import './../App/App.scss';
import './Lists.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usePostListMutation } from './../../API/APIslice';

import { useGetAllListsOfOneBoardQuery } from './../../API/APIslice';

import {
  setToggleTaskModal,
  setTaskTitleValue,
  setTaskDescriptionValue,
  setTaskListIdValue,
} from './../App/appSlice';

function CreateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedBoardId,
    taskTitleValue,
    taskDescriptionValue,
    taskListIdValue,
  } = useSelector((state) => state.app);

  const selectedBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;
  const selectedBoardQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const [postList] = usePostListMutation();

  const postNewList = (e) => {
    e.preventDefault();

    postList({
      name: e.target.name.value,
      color: e.target.color.value,
      board_id: Number(selectedBoardId),
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        selectedBoardQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-1);
      });
  };

  return ReactDOM.createPortal(
    <div className="task-details">
      <div className="task-details-container">
        <div className="task-details-title-section">
          <h2 className="task-details-title">Add New List</h2>
          <div>
            <img
              src={require('./../../assets/images/icon-cross.png')}
              alt="Task option icon"
              className="boards-element-icon"
              onClick={() => {
                dispatch(setToggleTaskModal());
                navigate(-1);
              }}
            />
          </div>
        </div>

        <form className="task-create-form" onSubmit={postNewList}>
          <label for="name" className="task-details-subtitle">
            List name :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="task-create-input"
            value={taskTitleValue}
            onChange={(e) => {
              dispatch(setTaskTitleValue(e.target.value));
            }}
          />

          <label for="description" className="task-details-subtitle">
            List color :
          </label>
          <input
            type="text"
            name="color"
            id="color"
            className="task-create-input"
            value={taskTitleValue}
            onChange={(e) => {
              dispatch(setTaskTitleValue(e.target.value));
            }}
          />
          <button type="submit" className="button-submit">
            Create Task
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default CreateTask;
