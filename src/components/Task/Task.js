import './../App/App.scss';
import './Task.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setToggleTaskOptions,
  setToggleTaskStatusOptions,
  setToggleTaskModal,
} from './../App/appSlice';
import {
  useGetOneTaskQuery,
  useGetAllListsOfOneBoardQuery,
} from './../../API/APIslice';

function Task() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedTaskId,
    toggleTaskOptions,
    selectedBoardId,
    toggleTaskStatusOptions,
  } = useSelector((state) => state.app);

  const selectedTask = useGetOneTaskQuery(selectedTaskId).data;
  const selectedBoard = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  const taskCurrentList = selectedBoard?.find(
    (element) => element.id === selectedTaskId
  );

  console.log(selectedTask);

  return ReactDOM.createPortal(
    <div className="task-details">
      <div className="task-details-container">
        <div className="task-details-title-section">
          <h2 className="task-details-title">{selectedTask?.name}</h2>
          <div>
            <img
              src={require('./../../assets/images/icon-vertical-ellipsis.png')}
              alt="Task option icon"
              className="boards-element-icon"
              onClick={() => dispatch(setToggleTaskOptions())}
            />
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

          {toggleTaskOptions && (
            <div className="task-options-container">
              <p>Edit Board</p>
              <p className="danger">Delete Board</p>
            </div>
          )}
        </div>
        <p className="task-details-desc">{selectedTask?.description}</p>
        <h3 className="task-details-subtitle">
          {
            selectedTask?.subtasks.filter((element) => element.is_done === true)
              .length
          }{' '}
          of {selectedTask?.subtasks.length} subtasks
        </h3>
        <ul className="subtasks-container">
          {selectedTask?.subtasks.map((element) => (
            <li className="subtasks-element">
              {element.is_done ? (
                <>
                  <div className="subtasks-checkbox-true">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <p className="text-outline">{element.description}</p>
                </>
              ) : (
                <>
                  <div className="subtasks-checkbox-false"></div>
                  <p className="text-medium">{element.description}</p>
                </>
              )}
            </li>
          ))}
        </ul>
        <h3 className="task-details-subtitle">Current status</h3>
        <div
          className="task-details-status"
          onClick={() => dispatch(setToggleTaskStatusOptions())}
        >
          <p>{taskCurrentList?.name}</p>
          <i className="fa-solid fa-chevron-down"></i>
          {toggleTaskStatusOptions && (
            <>
              <div className="task-list-option">
                {selectedBoard
                  ?.filter((element) => element.id !== selectedTask.list_id)
                  ?.map((element) => (
                    <p key={element.id}>{element.name}</p>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Task;
