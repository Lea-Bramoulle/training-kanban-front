import './../App/App.scss';
import './Task.scss';

import { React, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet, useLocation } from 'react-router-dom';

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
  setSelectedBoardID,
} from './../App/appSlice';

function Task() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [updateSubtask] = useUpdateSubtaskMutation();
  const [postSubtask] = usePostSubtaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const {
    selectedTaskId,
    toggleTaskOptions,
    selectedBoardId,
    toggleTaskStatusOptions,
    subtaskDescriptionValue,
  } = useSelector((state) => state.app);

  const selectedTask = useGetOneTaskQuery(selectedTaskId).data;
  const selectedBoard = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  const selectedTaskQuery = useGetOneTaskQuery(selectedTaskId);
  const selectedBoardQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const taskCurrentList = selectedBoard?.find(
    (element) => element.id === selectedTask?.list_id
  );

  const postNewSubtask = (e) => {
    e.preventDefault();
    postSubtask({
      description: e.target.description.value,
      is_done: false,
      task_id: Number(selectedTaskId),
    })
      .unwrap()
      .then((data) => {
        dispatch(setSubtaskDescriptionValue(''));
        selectedTaskQuery.refetch();
        console.log(data);
      });
  };

  const handleUpdateSubtaskStatus = (id, is_done) => {
    updateSubtask({
      id,
      is_done,
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        selectedTaskQuery.refetch();
      });
  };

  const handleUpdateTaskStatus = (id, list_id) => {
    updateTask({
      id,
      list_id,
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
                selectedBoardQuery.refetch();
                dispatch(setToggleTaskModal());
                navigate(-1);
              }}
            />
          </div>
          {toggleTaskOptions && (
            <div className="task-options-container">
              <Link
                to={`/task/update`}
                state={{ background: location }}
                onClick={() => {
                  dispatch(setToggleTaskModal());
                  dispatch(setToggleTaskOptions());
                }}
              >
                <p>Edit Task</p>
              </Link>
              <Link
                to={`/task/delete`}
                state={{ background: location }}
                className="danger"
                onClick={() => {
                  dispatch(setToggleTaskModal());
                  dispatch(setToggleTaskOptions());
                }}
              >
                <p>Delete Task</p>
              </Link>
            </div>
          )}
        </div>
        <p className="task-details-desc">{selectedTask?.description}</p>

        {selectedTask?.subtasks.length === 0 ? (
          <p className="task-details-empty">
            No subtasks yet. Begin to organize your work !
          </p>
        ) : (
          <>
            <h3 className="task-details-subtitle">
              {
                selectedTask?.subtasks.filter(
                  (element) => element.is_done === true
                ).length
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
                        onClick={() => {
                          handleUpdateSubtaskStatus(
                            element.id,
                            !element.is_done
                          );
                        }}
                      >
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <p className="text-outline">{element.description}</p>
                    </>
                  ) : (
                    <>
                      <div
                        className="subtasks-checkbox-false"
                        onClick={() => {
                          handleUpdateSubtaskStatus(
                            element.id,
                            !element.is_done
                          );
                        }}
                      ></div>
                      <p className="text-medium">{element.description}</p>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
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
                        handleUpdateTaskStatus(
                          Number(selectedTask.id),
                          Number(element.id)
                        )
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
