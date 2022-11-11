import './../App/App.scss';
import './Lists.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TwitterPicker } from 'react-color';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  usePostListMutation,
  useGetAllListsOfOneBoardQuery,
} from './../../API/APIslice';

import {
  setToggleTaskModal,
  setListTitleValue,
  setColorPickerValue,
} from './../App/appSlice';

function CreateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedBoardId, listTitleValue, colorPickerValue, darkMode } =
    useSelector((state) => state.app);

  const selectedBoardQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const [postList] = usePostListMutation();

  const postNewList = (e) => {
    e.preventDefault();

    if (!e.target.name.value) {
      toast.error(
        'Please add a valid title in order to add a new column to this board.'
      );
    }

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
          <h2 className="task-details-title">Add New Column</h2>
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
            Column name :
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
            Column color :
          </label>
          <TwitterPicker
            onChangeComplete={handleChangeColorValue}
            color={colorPickerValue}
            className="twitter-picker"
          />
          <button type="submit" className="button-submit">
            Create Column
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
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>,
    document.getElementById('modal-root')
  );
}

export default CreateTask;
