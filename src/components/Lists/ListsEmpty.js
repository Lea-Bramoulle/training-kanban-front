import './Lists.scss';
import './../../styles/_reset.scss';

import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { setToggleTaskModal } from './../App/appSlice';

import { useDispatch } from 'react-redux';

function ListsEmpty() {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div className="lists-container-empty">
      <p>This board is empty. Create a new column to get started.</p>
      <Link
        to={`/list/create`}
        state={{ background: location }}
        onClick={() => dispatch(setToggleTaskModal())}
        className="main-button"
      >
        <i className="fa-sharp fa-solid fa-plus"></i> Add new column
      </Link>
    </div>
  );
}

export default ListsEmpty;
