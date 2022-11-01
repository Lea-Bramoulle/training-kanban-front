import './../App/App.scss';
import './Task.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  useUpdateSubtaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  usePostSubtaskMutation,
} from './../../API/APIslice';

import {
  useGetOneTaskQuery,
  useGetAllListsOfOneBoardQuery,
} from './../../API/APIslice';

import {
  setToggleTaskOptions,
  setToggleTaskStatusOptions,
  setToggleTaskModal,
  setSubtaskDescriptionValue,
} from './../App/appSlice';

function Task() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateSubtask] = useUpdateSubtaskMutation();
  const [postSubtask] = usePostSubtaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const {
    selectedTaskId,
    toggleTaskOptions,
    selectedBoardId,
    toggleTaskStatusOptions,
    subtaskDescriptionValue,
  } = useSelector((state) => state.app);

  const selectedTask = useGetOneTaskQuery(selectedTaskId).data;
  const selectedBoard = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  const taskCurrentList = selectedBoard?.find(
    (element) => element.id === selectedTask?.list_id
  );

  const postNewSubtask = (e) => {
    e.preventDefault();
    console.log(e.target.description.value);
    postSubtask({
      description: e.target.description.value,
      is_done: false,
      task_id: Number(selectedTaskId),
    })
      .unwrap()
      .then((data) => {
        console.log(data);
      });
  };

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
              <p>Edit Task</p>
              <p
                className="danger"
                onClick={() => {
                  deleteTask({
                    taskId: selectedTaskId,
                  });
                  dispatch(setToggleTaskModal());
                  navigate(-1);
                }}
              >
                Delete Task
              </p>
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
            <li className="subtasks-element" key={element.id}>
              {element.is_done ? (
                <>
                  <div
                    className="subtasks-checkbox-true"
                    onClick={() =>
                      updateSubtask({
                        id: element.id,
                        is_done: !element.is_done,
                      })
                    }
                  >
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <p className="text-outline">{element.description}</p>
                </>
              ) : (
                <>
                  <div
                    className="subtasks-checkbox-false"
                    onClick={() =>
                      updateSubtask({
                        id: element?.id,
                        is_done: !element?.is_done,
                      })
                    }
                  ></div>
                  <p className="text-medium">{element.description}</p>
                </>
              )}
            </li>
          ))}
        </ul>
        <form className="subtasks-form" onSubmit={postNewSubtask}>
          <input
            type="text"
            name="description"
            id="description"
            className="task-create-input"
            placeholder="e.g. Drink the & smile"
            style={{ width: '100%', marginTop: '-2rem' }}
            value={subtaskDescriptionValue}
            onChange={(e) => {
              dispatch(setSubtaskDescriptionValue(e.target.value));
            }}
          />
          <button type="submit" className="button-submit-secondary">
            Add new subtask
          </button>
        </form>
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
                    <p
                      key={element.id}
                      onClick={() =>
                        updateTask({
                          id: element?.id,
                          list_id: Number(element.id),
                        })
                      }
                    >
                      {element.name}
                    </p>
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
