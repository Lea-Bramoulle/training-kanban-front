import './../App/App.scss';
import './Board.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usePostBoardMutation } from './../../API/APIslice';

import { useGetAllBoardsQuery } from './../../API/APIslice';

import {
  setToggleTaskModal,
  setBoardTitleValue,
  setSelectedBoardID,
} from './../App/appSlice';

function CreateBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { boardTitleValue } = useSelector((state) => state.app);

  const [postBoard] = usePostBoardMutation();

  const boardsDataQuery = useGetAllBoardsQuery();

  const postNewBoard = (e) => {
    e.preventDefault();

    postBoard({
      name: e.target.name.value,
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(setBoardTitleValue(''));
        dispatch(setSelectedBoardID(data.id));
        boardsDataQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-1);
      });
  };

  return ReactDOM.createPortal(
    <div className="task-details">
      <div className="task-details-container">
        <div className="task-details-title-section">
          <h2 className="task-details-title">Add New Board</h2>
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

        <form className="task-create-form" onSubmit={postNewBoard}>
          <label for="name" className="task-details-subtitle">
            Board name :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="task-create-input"
            value={boardTitleValue}
            onChange={(e) => {
              dispatch(setBoardTitleValue(e.target.value));
            }}
          />
          <button type="submit" className="button-submit">
            Create Board
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default CreateBoard;
