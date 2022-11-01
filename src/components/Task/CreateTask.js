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
} from './../../API/APIslice';

import {
  useGetOneTaskQuery,
  useGetAllListsOfOneBoardQuery,
} from './../../API/APIslice';

import {
  setToggleTaskOptions,
  setToggleTaskStatusOptions,
  setToggleTaskModal,
} from './../App/appSlice';

function CreateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const [updateSubtask] = useUpdateSubtaskMutation();

  //   const selectedTask = useGetOneTaskQuery(selectedTaskId).data;
  //   const selectedBoard = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  return ReactDOM.createPortal(
    <div className="task-details">
      <div className="task-details-container">
        <div className="task-details-title-section">
          <h2 className="task-details-title">sqd</h2>
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
        </div>

        <h3 className="task-details-subtitle">Current status</h3>
        <div
          className="task-details-status"
          onClick={() => dispatch(setToggleTaskStatusOptions())}
        >
          {/* <p>{taskCurrentList?.name}</p>
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
          )} */}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default CreateTask;
