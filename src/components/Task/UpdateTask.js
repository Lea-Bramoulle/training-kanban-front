import './../App/App.scss';
import './Task.scss';

import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  useGetAllBoardsQuery,
  useGetAllListsOfOneBoardQuery,
  useUpdateTaskMutation,
  useGetOneTaskQuery,
  useUpdateSubtaskMutation,
  useDeleteSubtaskMutation,
} from './../../API/APIslice';

import {
  setToggleTaskModal,
  setToggleBordOptions,
  setToggleTaskOptions,
  setTaskTitleValue,
  setTaskDescriptionValue,
} from './../App/appSlice';

function UpdateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedBoardId,
    selectedTaskId,
    taskTitleValue,
    taskDescriptionValue,
  } = useSelector((state) => state.app);

  const [updateTask] = useUpdateTaskMutation();
  const [updateSubtask] = useUpdateSubtaskMutation();
  const [deleteSubtask] = useDeleteSubtaskMutation();

  const boardsDataQuery = useGetAllBoardsQuery();
  const taskDataQuery = useGetOneTaskQuery(selectedTaskId);
  const taskData = useGetOneTaskQuery(selectedTaskId).data;
  const boardListsDataQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const [subtasksNameValues, setSubtasksNameValues] = useState(
    taskData.subtasks
  );

  const handleSubtaskNameValueChange = (id, value) => {
    const newSubtaskNameValues = [...subtasksNameValues];
    newSubtaskNameValues[id] = {
      ...subtasksNameValues[id],
      description: value,
    };

    setSubtasksNameValues(newSubtaskNameValues);
  };

  const updateSelectedTask = (e) => {
    e.preventDefault();

    taskData?.subtasks.forEach((element) => {
      const subtaskInStateValue = subtasksNameValues.find(
        (i) => i.id === element.id
      );

      if (subtaskInStateValue?.description !== element.description) {
        updateSubtask({
          id: subtaskInStateValue?.id,
          description: subtaskInStateValue?.description,
        })
          .unwrap()
          .then((data) => {
            console.log(data);
            boardListsDataQuery.refetch();
            boardsDataQuery.refetch();
            taskDataQuery.refetch();
          });
      }
    });

    updateTask({
      id: selectedTaskId,
      name: e.target.name.value,
      description: e.target.description.value,
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        boardListsDataQuery.refetch();
        taskDataQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-2);
      });
  };

  const handleDeleteSubtask = (subtaskId) => {
    const newSubtaskArray = [...subtasksNameValues].filter(
      (element) => element.id !== subtaskId
    );
    console.log(newSubtaskArray);
    setSubtasksNameValues(newSubtaskArray);

    deleteSubtask(subtaskId)
      .unwrap()
      .then(() => {
        taskDataQuery.refetch();
      });
  };

  return ReactDOM.createPortal(
    <div className="task-details">
      <div className="task-details-container">
        <div className="task-details-title-section">
          <h2 className="task-details-title">Edit Task</h2>
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

        <form className="task-create-form" onSubmit={updateSelectedTask}>
          <label for="name" className="task-details-subtitle">
            Task name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="task-create-input"
            placeholder={taskData?.name}
            value={taskTitleValue}
            onChange={(e) => {
              dispatch(setTaskTitleValue(e.target.value));
            }}
          />
          <label for="description" className="task-details-subtitle">
            Task description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder={taskData?.description}
            className="task-create-input"
            value={taskDescriptionValue}
            onChange={(e) => {
              dispatch(setTaskDescriptionValue(e.target.value));
            }}
          >
            e.g. It’s always good to take a break. This 15 minute break will
            recharge the batteries a little.
          </textarea>
          {taskData?.subtasks.length !== 0 && (
            <p className="task-details-subtitle">Subtasks</p>
          )}
          <div className="board-update-lists">
            {taskData?.subtasks.map((element, id) => (
              <div key={id} className=" board-update-container">
                <input
                  type="text"
                  name={`name-${id}`}
                  id={`name-${id}`}
                  className="board-update-input"
                  placeholder={element.description}
                  value={subtasksNameValues[element.id]?.value}
                  onChange={(e) => {
                    handleSubtaskNameValueChange(id, e.target.value);
                  }}
                />
                <i
                  onClick={() => {
                    handleDeleteSubtask(element.id);
                  }}
                  className="fa-solid fa-xmark"
                ></i>
              </div>
            ))}
          </div>
          <button type="submit" className="button-submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default UpdateTask;
