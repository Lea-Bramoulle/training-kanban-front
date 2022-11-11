import './../App/App.scss';
import './Task.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { usePostTaskMutation } from './../../API/APIslice';

import { useGetAllListsOfOneBoardQuery } from './../../API/APIslice';

import {
  setToggleTaskModal,
  setTaskTitleValue,
  setTaskDescriptionValue,
} from './../App/appSlice';

import getObjectMinId from '../../utils/getObjectMinId';

function CreateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedBoardId, taskTitleValue, taskDescriptionValue } = useSelector(
    (state) => state.app
  );

  const [postTask] = usePostTaskMutation();

  const selectedBoard = useGetAllListsOfOneBoardQuery(selectedBoardId).data;
  const selectedBoardQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const postNewTask = (e) => {
    e.preventDefault();

    if (!e.target.name.value) {
      toast.error('Please add a description in order to create your task.');
    }

    if (!e.target.description.value) {
      toast.error('Please add a title in order to create your task.');
    }

    postTask({
      name: e.target.name.value,
      description: e.target.description.value,
      position: 1,
      list_id: Number(e.target.status.value),
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(setTaskTitleValue(''));
        dispatch(setTaskDescriptionValue(''));
        selectedBoardQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-1);
      });
  };

  return ReactDOM.createPortal(
    <div className="task-details">
      <div className="task-details-container">
        <div className="task-details-title-section">
          <h2 className="task-details-title">Add New Task</h2>
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

        <form className="task-create-form" onSubmit={postNewTask}>
          <label for="name" className="task-details-subtitle">
            Title
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Drink coffee & smile"
            className="task-create-input"
            value={taskTitleValue}
            onChange={(e) => {
              dispatch(setTaskTitleValue(e.target.value));
            }}
          />

          <label for="description" className="task-details-subtitle">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
            recharge the batteries a little."
            className="task-create-input"
            value={taskDescriptionValue}
            onChange={(e) => {
              dispatch(setTaskDescriptionValue(e.target.value));
            }}
          >
            e.g. It’s always good to take a break. This 15 minute break will
            recharge the batteries a little.
          </textarea>
          <label for="status" className="task-details-subtitle">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="task-details-status"
            style={{ width: '100%' }}
          >
            <option
              value={
                selectedBoard?.find(
                  (element) => element.id === getObjectMinId(selectedBoard)
                ).id
              }
            >
              {
                selectedBoard?.find(
                  (element) => element.id === getObjectMinId(selectedBoard)
                ).name
              }
            </option>
            {selectedBoard
              ?.filter(
                (element) => element.id !== getObjectMinId(selectedBoard)
              )
              ?.map((element) => (
                <option value={element.id} key={element.id}>
                  {element.name}
                </option>
              ))}
          </select>
          <button type="submit" className="button-submit">
            Create Task
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>,
    document.getElementById('modal-root')
  );
}

export default CreateTask;
