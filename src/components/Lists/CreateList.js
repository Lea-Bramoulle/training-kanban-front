import './../App/App.scss';
import './Lists.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TwitterPicker } from 'react-color';

import { usePostListMutation } from './../../API/APIslice';

import { useGetAllListsOfOneBoardQuery } from './../../API/APIslice';

import {
  setToggleTaskModal,
  setListTitleValue,
  setColorPickerValue,
} from './../App/appSlice';

function CreateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedBoardId, listTitleValue, colorPickerValue } = useSelector(
    (state) => state.app
  );

  const selectedBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;
  const selectedBoardQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const [postList] = usePostListMutation();

  const postNewList = (e) => {
    e.preventDefault();

    postList({
      name: e.target.name.value,
      color: colorPickerValue,
      board_id: Number(selectedBoardId),
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(setListTitleValue(''));
        dispatch(setColorPickerValue('#635FC7'));
        selectedBoardQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-1);
      });
  };

  const handleChangeColorValue = (color) => {
    dispatch(setColorPickerValue(color.hex));
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
            value={listTitleValue}
            onChange={(e) => {
              dispatch(setListTitleValue(e.target.value));
            }}
          />

          <label for="description" className="task-details-subtitle">
            List color :
          </label>
          <TwitterPicker
            onChangeComplete={handleChangeColorValue}
            color={colorPickerValue}
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
