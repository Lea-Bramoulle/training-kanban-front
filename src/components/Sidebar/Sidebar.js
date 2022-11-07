import './Sidebar.scss';

import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  setDisplayDarkMode,
  setSelectedBoardID,
  setToggleSidebar,
  setToggleTaskModal,
  setIsMobileDevice,
} from './../App/appSlice';

import { useGetAllBoardsQuery } from './../../API/APIslice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { darkMode, selectedBoardId, toggleSidebar } = useSelector(
    (state) => state.app
  );
  const { data, error, isLoading } = useGetAllBoardsQuery();

  return (
    <div className="sidebar-relative">
      {toggleSidebar && (
        <section className="sidebar">
          <img
            src={require('./../../assets/images/logo-dark.png')}
            alt="kanban logo"
            className="sidebar-logo"
          />
          <div className="boards">
            <h2 className="boards-title">All Boards ({data?.length})</h2>
            <ul className="boards-container">
              {data?.map((element) => (
                <li
                  key={element.id}
                  className={
                    element.id === selectedBoardId
                      ? 'boards-element boards-element--active'
                      : 'boards-element'
                  }
                  onClick={() => dispatch(setSelectedBoardID(element.id))}
                >
                  <img
                    src={require('./../../assets/images/icon-board.png')}
                    alt="board icon"
                    className="boards-element-icon"
                  />
                  {element.name}
                </li>
              ))}
            </ul>
            <div className="boards-element boards-element--main">
              <img
                src={require('./../../assets/images/icon-board.png')}
                alt="board icon"
                className="boards-element-icon"
              />
              <Link
                to={`/board/create`}
                state={{ background: location }}
                onClick={() => dispatch(setToggleTaskModal())}
                className="link-active"
              >
                <i className="fa-sharp fa-solid fa-plus"></i> Create new board
              </Link>
            </div>
          </div>
          <div className="darkmode-container">
            <img
              src={require('./../../assets/images/icon-dark-theme.png')}
              alt="darkmode icon dark"
              className="darkmode-icon"
            />
            <div
              className="darkmode-button"
              onClick={() => dispatch(setDisplayDarkMode())}
            >
              <div
                className={
                  darkMode
                    ? 'darkmode-button-toggler '
                    : 'darkmode-button-toggler darkmode-button-toggler--active'
                }
              ></div>
            </div>
            <img
              src={require('./../../assets/images/icon-light-theme.png')}
              alt="darkmode icon light"
              className="darkmode-icon"
            />
          </div>
          <div
            className="sidebar-toggle-container"
            onClick={() => dispatch(setToggleSidebar())}
          >
            <p>
              <i className="fa-solid fa-eye-slash"></i> Hide sidebar
            </p>
          </div>
        </section>
      )}
      {!toggleSidebar && (
        <div
          className="sidebar-display-button"
          onClick={() => dispatch(setToggleSidebar())}
        >
          <i className="fa-solid fa-eye"></i>
        </div>
      )}
    </div>
  );
}

export default App;
