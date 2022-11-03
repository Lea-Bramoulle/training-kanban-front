import './Board.scss';
import './../../styles/_reset.scss';

import React from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';

import { setToggleTaskModal } from './../App/appSlice';

import { useSelector, useDispatch } from 'react-redux';

function BoardEmpty() {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div className="board-container-empty">
      <p>Create a new Board to get started.</p>
      <Link
        to={`/board/create`}
        state={{ background: location }}
        onClick={() => dispatch(setToggleTaskModal())}
        className="main-button"
      >
        <i className="fa-sharp fa-solid fa-plus"></i> Add new Board
      </Link>
    </div>
  );
}

export default BoardEmpty;
