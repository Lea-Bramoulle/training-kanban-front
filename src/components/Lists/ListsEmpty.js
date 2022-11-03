import './Lists.scss';
import './../../styles/_reset.scss';

import React from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';

import { setToggleTaskModal } from './../App/appSlice';

import { useSelector, useDispatch } from 'react-redux';

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
        Add new column
      </Link>
    </div>
  );
}

export default ListsEmpty;
